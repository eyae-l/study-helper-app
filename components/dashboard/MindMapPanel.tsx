"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FileUploadButton from "../FileUploadButton";
import PasteButton from "../PasteButton";

// Enhanced types with descriptions and node selection
interface MindMapNode {
  id: string;
  label: string;
  description?: string;
  type: "root" | "concept" | "detail";
  children: MindMapNode[];
  expanded: boolean;
  x: number;
  y: number;
}

interface MindMapData {
  id: string;
  title: string;
  timestamp: number;
  rootNode: MindMapNode;
  source: string;
}

type LoadingPhase = "analyzing" | "extracting" | "building" | "finalizing";

export default function MindMapPanel() {
  // Core state
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>("analyzing");
  const [inputText, setInputText] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"text" | "file" | null>(null);
  const [currentMindMap, setCurrentMindMap] = useState<MindMapData | null>(null);
  const [savedMindMaps, setSavedMindMaps] = useState<MindMapData[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Canvas interaction state
  const [scale, setScale] = useState(0.8);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Node selection state
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showNodeDetail, setShowNodeDetail] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // File upload handlers
  const handleFileUpload = (content: string, fileName: string) => {
    setInputText(content);
    setUploadedFileName(fileName);
    setUploadMethod("text");
  };

  const handlePaste = (content: string) => {
    setInputText(content);
    setUploadedFileName("");
    setUploadMethod("text");
  };

  const handleError = (errorMsg: string) => {
    setError(errorMsg);
    setTimeout(() => setError(null), 5000);
  };

  // LocalStorage persistence
  useEffect(() => {
    const saved = localStorage.getItem("mind_maps");
    if (saved) {
      try {
        setSavedMindMaps(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved mind maps");
      }
    }
  }, []);

  const saveMindMaps = useCallback((maps: MindMapData[]) => {
    localStorage.setItem("mind_maps", JSON.stringify(maps));
    setSavedMindMaps(maps);
  }, []);

  // Mind Map Generation with proper error handling
  const generateMindMap = async () => {
    if (!inputText.trim()) {
      handleError("Please enter some content first");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setLoadingPhase("analyzing");

    try {
      const { ApiClient } = await import("@/lib/api-client");
      
      setTimeout(() => setLoadingPhase("extracting"), 1000);
      
      const result = await ApiClient.generateMindMap(inputText);
      
      setLoadingPhase("building");
      
      // Validate and parse AI response
      const rootNode = parseAndValidateMindMap(result.mindMap, inputText);
      
      setLoadingPhase("finalizing");
      
      const newMindMap: MindMapData = {
        id: Date.now().toString(),
        title: rootNode.label,
        timestamp: Date.now(),
        rootNode,
        source: inputText.substring(0, 150) + (inputText.length > 150 ? "..." : ""),
      };

      setCurrentMindMap(newMindMap);
      const updatedMaps = [newMindMap, ...savedMindMaps].slice(0, 10); // Keep last 10
      saveMindMaps(updatedMaps);
      
      // Reset view
      setScale(0.8);
      setOffset({ x: 0, y: 0 });
      setSelectedNodeId(null);
      
    } catch (error) {
      console.error("Error generating mind map:", error);
      handleError(error instanceof Error ? error.message : "Failed to generate mind map");
      
      // Create fallback mind map if AI fails
      const fallbackNode = createFallbackMindMap(inputText);
      const fallbackMindMap: MindMapData = {
        id: Date.now().toString(),
        title: fallbackNode.label,
        timestamp: Date.now(),
        rootNode: fallbackNode,
        source: inputText.substring(0, 150) + "...",
      };
      setCurrentMindMap(fallbackMindMap);
      
    } finally {
      setIsGenerating(false);
    }
  };

  // Parse and validate AI response with robust error handling
  const parseAndValidateMindMap = (data: any, sourceContent: string): MindMapNode => {
    try {
      // Handle different response formats
      const nodesData = data.nodes || [data];
      const rootData = Array.isArray(nodesData) ? nodesData[0] : nodesData;
      
      if (!rootData || !rootData.label) {
        throw new Error("Invalid mind map structure");
      }

      let nodeCounter = 0; // Ensure unique IDs
      
      const convertNode = (nodeData: any, level: number = 0, parentPath: string = ""): MindMapNode => {
        // Generate unique ID with counter and path
        const uniqueId = nodeData.id || `${parentPath}-node-${level}-${nodeCounter++}`;
        
        // Validate required fields
        if (!nodeData.label) nodeData.label = "Untitled";
        
        return {
          id: uniqueId,
          label: nodeData.label.substring(0, 60), // Limit label length
          description: nodeData.description || "",
          type: level === 0 ? "root" : level === 1 ? "concept" : "detail",
          expanded: level < 2, // Auto-expand first 2 levels
          x: 0,
          y: 0,
          children: (nodeData.children || [])
            .slice(0, 8) // Limit children per node
            .map((child: any, idx: number) => convertNode(child, level + 1, `${uniqueId}-${idx}`))
            .filter((child: MindMapNode) => child.label !== "Untitled"), // Remove invalid nodes
        };
      };

      return convertNode(rootData, 0, "root");
      
    } catch (error) {
      console.error("Failed to parse mind map:", error);
      throw new Error("Invalid AI response format");
    }
  };

  // Fallback mind map creation from content
  const createFallbackMindMap = (content: string): MindMapNode => {
    const lines = content.split("\n").filter(line => line.trim().length > 0);
    const title = lines[0]?.substring(0, 50) || "Study Material";
    
    // Extract key sentences as concepts
    const sentences = content
      .split(/[.!?]+/)
      .filter(s => s.trim().length > 20 && s.trim().length < 100)
      .slice(0, 6);
    
    const concepts: MindMapNode[] = sentences.map((sentence, idx) => ({
      id: `fallback-concept-${idx}-${Date.now()}`,
      label: sentence.trim().substring(0, 40) + "...",
      description: sentence.trim(),
      type: "concept" as const,
      expanded: true,
      x: 0,
      y: 0,
      children: [],
    }));

    return {
      id: `fallback-root-${Date.now()}`,
      label: title,
      description: "Generated from your content",
      type: "root",
      expanded: true,
      x: 0,
      y: 0,
      children: concepts,
    };
  };

  // Toggle node expansion
  const toggleNode = useCallback((nodeId: string) => {
    if (!currentMindMap) return;

    const updateNode = (node: MindMapNode): MindMapNode => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      return {
        ...node,
        children: node.children.map(updateNode),
      };
    };

    setCurrentMindMap({
      ...currentMindMap,
      rootNode: updateNode(currentMindMap.rootNode),
    });
  }, [currentMindMap]);

  // Select node to show details
  const selectNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    setShowNodeDetail(true);
  }, []);

  // Get selected node data
  const getSelectedNode = (): MindMapNode | null => {
    if (!currentMindMap || !selectedNodeId) return null;
    
    const findNode = (node: MindMapNode): MindMapNode | null => {
      if (node.id === selectedNodeId) return node;
      for (const child of node.children) {
        const found = findNode(child);
        if (found) return found;
      }
      return null;
    };
    
    return findNode(currentMindMap.rootNode);
  };

  // Advanced radial layout algorithm - NotebookLM style
  const calculatePositions = useCallback((rootNode: MindMapNode) => {
    const centerX = 600;
    const centerY = 400;
    const baseRadius = 200;
    const levelSpacing = 180;
    
    const positionNode = (
      node: MindMapNode,
      parentX: number,
      parentY: number,
      angle: number,
      radius: number,
      level: number
    ) => {
      if (level === 0) {
        node.x = centerX;
        node.y = centerY;
      } else {
        node.x = parentX + Math.cos(angle) * radius;
        node.y = parentY + Math.sin(angle) * radius;
      }

      if (!node.expanded || node.children.length === 0) return;

      const childCount = node.children.length;
      const arcSize = level === 0 ? Math.PI * 2 : Math.PI * 1.5 / Math.max(1, Math.floor(level / 2));
      const angleStep = arcSize / Math.max(childCount, 1);
      const startAngle = level === 0 ? -Math.PI / 2 : angle - arcSize / 2;
      const childRadius = baseRadius + (level * levelSpacing);

      node.children.forEach((child, index) => {
        const childAngle = startAngle + (angleStep * (index + 0.5));
        positionNode(child, node.x, node.y, childAngle, childRadius, level + 1);
      });
    };

    positionNode(rootNode, centerX, centerY, 0, 0, 0);
  }, []);

  // Render node and connections recursively
  const renderNode = useCallback((
    node: MindMapNode,
    parentNode?: MindMapNode
  ): React.ReactElement[] => {
    const elements: React.ReactElement[] = [];
    const isSelected = node.id === selectedNodeId;

    // Draw curved connection to parent
    if (parentNode) {
      const dx = node.x - parentNode.x;
      const dy = node.y - parentNode.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const controlDist = dist * 0.4;
      
      const controlX = parentNode.x + dx * 0.3;
      const controlY = parentNode.y + dy * 0.3 + controlDist * 0.2;

      elements.push(
        <path
          key={`path-${node.id}`}
          d={`M ${parentNode.x} ${parentNode.y} Q ${controlX} ${controlY} ${node.x} ${node.y}`}
          stroke={isSelected ? "#10b981" : node.type === "root" ? "#a855f7" : node.type === "concept" ? "#3b82f6" : "#14b8a6"}
          strokeWidth={isSelected ? "4" : "2.5"}
          fill="none"
          opacity={isSelected ? 0.9 : 0.6}
          className="transition-all duration-300"
        />
      );
    }

    // Node dimensions based on type
    const sizes = {
      root: { width: 240, height: 80 },
      concept: { width: 200, height: 70 },
      detail: { width: 180, height: 60 },
    };
    
    const size = sizes[node.type];
    
    // Node colors
    const colors = {
      root: { bg: "from-purple-600 to-pink-600", ring: "ring-purple-400", shadow: "shadow-purple-500/40" },
      concept: { bg: "from-blue-600 to-cyan-600", ring: "ring-blue-400", shadow: "shadow-blue-500/30" },
      detail: { bg: "from-emerald-600 to-teal-600", ring: "ring-emerald-400", shadow: "shadow-emerald-500/20" },
    };
    
    const color = colors[node.type];

    elements.push(
      <g key={`node-${node.id}`}>
        <foreignObject
          x={node.x - size.width / 2}
          y={node.y - size.height / 2}
          width={size.width}
          height={size.height}
          className="overflow-visible"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              selectNode(node.id);
            }}
            className={`
              w-full h-full flex items-center justify-center
              bg-gradient-to-br ${color.bg}
              rounded-2xl px-4 py-3
              shadow-2xl ${color.shadow}
              border-2 ${isSelected ? `${color.ring} ring-4` : 'border-white/20'}
              cursor-pointer
              transition-all duration-300
              hover:scale-105 hover:shadow-3xl
              ${isSelected ? 'scale-110' : ''}
            `}
          >
            <p
              className="text-white font-semibold text-center leading-tight"
              style={{ 
                fontSize: node.type === "root" ? "18px" : node.type === "concept" ? "15px" : "13px",
                lineHeight: "1.3"
              }}
            >
              {node.label}
            </p>
          </div>
        </foreignObject>

        {/* Expand/Collapse button */}
        {node.children.length > 0 && (
          <g
            onClick={(e) => {
              e.stopPropagation();
              toggleNode(node.id);
            }}
            className="cursor-pointer"
          >
            <circle
              cx={node.x}
              cy={node.y + size.height / 2 + 20}
              r="16"
              fill="#1e293b"
              stroke={node.expanded ? "#10b981" : "#6b7280"}
              strokeWidth="3"
              className="transition-all duration-300 hover:r-18"
            />
            <text
              x={node.x}
              y={node.y + size.height / 2 + 20}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={node.expanded ? "#10b981" : "#9ca3af"}
              fontSize="20"
              fontWeight="bold"
              className="select-none pointer-events-none"
            >
              {node.expanded ? "−" : "+"}
            </text>
          </g>
        )}
      </g>
    );

    // Render children if expanded
    if (node.expanded && node.children.length > 0) {
      node.children.forEach((child) => {
        elements.push(...renderNode(child, node));
      });
    }

    return elements;
  }, [selectedNodeId, selectNode, toggleNode]);

  // Zoom handlers
  const handleZoom = useCallback((delta: number) => {
    setScale(prev => Math.max(0.3, Math.min(2, prev + delta)));
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    handleZoom(delta);
  }, [handleZoom]);

  const fitToScreen = useCallback(() => {
    setScale(0.8);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Calculate positions when mind map changes
  useEffect(() => {
    if (currentMindMap) {
      calculatePositions(currentMindMap.rootNode);
    }
  }, [currentMindMap, calculatePositions]);

  // Loading messages
  const loadingMessages = {
    analyzing: "Analyzing your study material...",
    extracting: "Extracting key concepts...",
    building: "Building knowledge connections...",
    finalizing: "Creating your mind map...",
  };

  const selectedNode = getSelectedNode();

  return (
    <div className="flex h-screen bg-black">
      {/* History Sidebar */}
      {showHistory && (
        <div className="w-80 bg-gray-950 border-r border-green-500/20 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Saved Mind Maps</h2>
            <button
              onClick={() => setShowHistory(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {savedMindMaps.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No saved mind maps yet</p>
          ) : (
            <div className="space-y-3">
              {savedMindMaps.map((map) => (
                <div
                  key={map.id}
                  onClick={() => {
                    setCurrentMindMap(map);
                    setShowHistory(false);
                    setSelectedNodeId(null);
                  }}
                  className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 cursor-pointer hover:border-green-500/50 hover:bg-gray-800 transition-all"
                >
                  <h3 className="text-white font-medium mb-1 line-clamp-1">{map.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">{map.source}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(map.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800 px-8 py-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Mind Map</h1>
              <p className="text-gray-400">Transform your notes into visual knowledge maps</p>
            </div>
            <div className="flex gap-3">
              {currentMindMap && (
                <button
                  onClick={() => {
                    setCurrentMindMap(null);
                    setSelectedNodeId(null);
                    setInputText("");
                    setUploadMethod(null);
                  }}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New
                </button>
              )}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </button>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/10 border-b border-red-500/20 px-8 py-4">
            <div className="flex items-center gap-3 text-red-400">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {!currentMindMap ? (
            // Input Section
            <div className="h-full flex items-center justify-center p-8">
              <div className="max-w-2xl w-full space-y-6">
                {isGenerating ? (
                  // Loading State
                  <div className="text-center space-y-6 py-12">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-4 animate-pulse">
                      <svg className="w-12 h-12 text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{loadingMessages[loadingPhase]}</h2>
                    <div className="flex items-center justify-center gap-2">
                      {(["analyzing", "extracting", "building", "finalizing"] as LoadingPhase[]).map((phase) => (
                        <div
                          key={phase}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            phase === loadingPhase ? "bg-purple-500 scale-125" : "bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : !uploadMethod ? (
                  // Upload Method Selection
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl mb-4">
                      <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Create Your Mind Map</h2>
                    <p className="text-gray-400">Upload or paste your study material to begin</p>

                    <div className="grid grid-cols-3 gap-4 mt-8">
                      <button
                        onClick={() => setUploadMethod("text")}
                        className="group p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </div>
                          <span className="text-white font-medium">Type Text</span>
                        </div>
                      </button>

                      <PasteButton
                        onPaste={handlePaste}
                        onError={handleError}
                        variant="card"
                        label="Paste"
                        description="From clipboard"
                      />

                      <FileUploadButton
                        onFileContent={handleFileUpload}
                        onError={handleError}
                        variant="card"
                        label="Upload"
                        description="TXT, MD, PDF"
                      />
                    </div>
                  </div>
                ) : (
                  // Input Form
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setUploadMethod(null);
                        setInputText("");
                        setUploadedFileName("");
                      }}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back
                    </button>

                    <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                      <h3 className="text-white font-semibold mb-4">Enter Your Study Material</h3>

                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste your notes, lecture content, or study material here..."
                        className="w-full h-64 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                      />

                      {uploadedFileName && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {uploadedFileName}
                        </div>
                      )}

                      <button
                        onClick={generateMindMap}
                        disabled={!inputText.trim()}
                        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate Mind Map
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Mind Map Viewer
            <div className="relative h-full bg-gradient-to-br from-gray-900 to-black">
              {/* Toolbar */}
              <div className="absolute top-6 right-6 z-10 flex gap-3">
                <div className="bg-gray-800/95 backdrop-blur rounded-xl p-2 flex gap-2 border border-gray-700">
                  <button
                    onClick={() => handleZoom(0.1)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title="Zoom In"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleZoom(-0.1)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title="Zoom Out"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <button
                    onClick={fitToScreen}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title="Fit to Screen"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <div
                ref={canvasRef}
                className={`w-full h-full overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                <svg
                  ref={svgRef}
                  width="100%"
                  height="100%"
                  className="select-none"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                  }}
                  viewBox="0 0 1200 800"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Background pattern */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill="#374151" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="1200" height="800" fill="url(#grid)" />
                  
                  {currentMindMap && renderNode(currentMindMap.rootNode)}
                </svg>
              </div>

              {/* Node Detail Panel */}
              {selectedNode && showNodeDetail && (
                <div className="absolute bottom-6 left-6 right-6 max-w-md bg-gray-800/95 backdrop-blur rounded-2xl p-6 border border-gray-700 shadow-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                        selectedNode.type === "root" ? "bg-purple-500/20 text-purple-400" :
                        selectedNode.type === "concept" ? "bg-blue-500/20 text-blue-400" :
                        "bg-emerald-500/20 text-emerald-400"
                      }`}>
                        {selectedNode.type === "root" ? "Main Topic" : selectedNode.type === "concept" ? "Concept" : "Detail"}
                      </span>
                      <h3 className="text-xl font-bold text-white">{selectedNode.label}</h3>
                    </div>
                    <button
                      onClick={() => {
                        setShowNodeDetail(false);
                        setSelectedNodeId(null);
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {selectedNode.description && (
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{selectedNode.description}</p>
                  )}
                  
                  {selectedNode.children.length > 0 && (
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-gray-400 text-sm mb-2">Related concepts:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => selectNode(child.id)}
                            className="px-3 py-1 bg-gray-700/50 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Info Panel */}
              <div className="absolute bottom-6 right-6 bg-gray-800/95 backdrop-blur rounded-xl p-4 max-w-xs border border-gray-700">
                <h3 className="text-white font-semibold mb-2">{currentMindMap.title}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Click nodes to explore • Drag to pan • Scroll to zoom</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
