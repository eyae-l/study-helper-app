"use client";

import { useState, useEffect, useRef } from "react";

interface MindMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  children: MindMapNode[];
  expanded: boolean;
  level: number;
}

interface MindMapData {
  id: string;
  title: string;
  timestamp: number;
  rootNode: MindMapNode;
  source: string;
}

export default function MindMapPanel() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputText, setInputText] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"text" | "file" | "url" | null>(null);
  const [currentMindMap, setCurrentMindMap] = useState<MindMapData | null>(null);
  const [savedMindMaps, setSavedMindMaps] = useState<MindMapData[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Load saved mind maps from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mind_maps");
    if (saved) {
      setSavedMindMaps(JSON.parse(saved));
    }
  }, []);

  // Save mind maps to localStorage
  const saveMindMaps = (maps: MindMapData[]) => {
    localStorage.setItem("mind_maps", JSON.stringify(maps));
    setSavedMindMaps(maps);
  };

  // Generate mind map from input
  const generateMindMap = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);

    try {
      // Import the API function
      const { generateMindMap: generateMindMapAPI } = await import("@/lib/api");
      
      // Get real AI-generated mind map structure
      const aiResponse = await generateMindMapAPI(inputText);
      
      // Parse the AI response
      let rootNode: MindMapNode;
      try {
        const parsed = JSON.parse(aiResponse);
        
        // Convert AI structure to our format
        const convertToMindMapNode = (data: any, level: number = 0): MindMapNode => {
          return {
            id: `node-${Date.now()}-${Math.random()}`,
            label: data.name || data.label || "Unknown",
            x: 500,
            y: 300,
            expanded: level < 2,
            level,
            children: (data.children || []).map((child: any) => convertToMindMapNode(child, level + 1)),
          };
        };
        
        rootNode = convertToMindMapNode(parsed);
      } catch (parseError) {
        console.error("Failed to parse mind map:", parseError);
        // Fallback to extracting structure
        rootNode = {
          id: "root",
          label: extractMainTopic(inputText),
          x: 500,
          y: 300,
          expanded: true,
          level: 0,
          children: generateChildNodes(inputText, 1),
        };
      }

      const newMindMap: MindMapData = {
        id: Date.now().toString(),
        title: rootNode.label,
        timestamp: Date.now(),
        rootNode,
        source: inputText.substring(0, 100) + "...",
      };

      setCurrentMindMap(newMindMap);
      const updatedMaps = [newMindMap, ...savedMindMaps];
      saveMindMaps(updatedMaps);
    } catch (error) {
      console.error("Error generating mind map:", error);
      
      // Fallback to local generation
      const rootNode: MindMapNode = {
        id: "root",
        label: extractMainTopic(inputText),
        x: 500,
        y: 300,
        expanded: true,
        level: 0,
        children: generateChildNodes(inputText, 1),
      };

      const newMindMap: MindMapData = {
        id: Date.now().toString(),
        title: extractMainTopic(inputText),
        timestamp: Date.now(),
        rootNode,
        source: inputText.substring(0, 100) + "...",
      };

      setCurrentMindMap(newMindMap);
      const updatedMaps = [newMindMap, ...savedMindMaps];
      saveMindMaps(updatedMaps);
    } finally {
      setIsGenerating(false);
    }
  };

  // Extract main topic from text
  const extractMainTopic = (text: string): string => {
    const firstLine = text.split("\n")[0];
    return firstLine.length > 50 ? firstLine.substring(0, 50) + "..." : firstLine;
  };

  // Generate child nodes recursively
  const generateChildNodes = (text: string, level: number): MindMapNode[] => {
    if (level > 2) return []; // Max 3 levels

    const concepts = extractConcepts(text, level);
    return concepts.map((concept, index) => ({
      id: `node-${level}-${index}`,
      label: concept,
      x: 0,
      y: 0,
      expanded: true,
      level,
      children: level < 2 ? generateChildNodes(concept, level + 1) : [],
    }));
  };

  // Extract concepts from text (simplified AI simulation)
  const extractConcepts = (text: string, level: number): string[] => {
    const words = text.split(/\s+/);
    const conceptCount = level === 1 ? 5 : 3;
    
    const concepts: string[] = [];
    for (let i = 0; i < conceptCount && i < words.length; i++) {
      const startIdx = Math.floor((i * words.length) / conceptCount);
      const endIdx = Math.min(startIdx + 3, words.length);
      concepts.push(words.slice(startIdx, endIdx).join(" "));
    }
    
    return concepts;
  };

  // Toggle node expansion
  const toggleNode = (nodeId: string) => {
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
  };

  // Calculate node positions
  const calculatePositions = (
    node: MindMapNode,
    parentX: number,
    parentY: number,
    angle: number,
    radius: number,
    index: number,
    totalSiblings: number
  ): void => {
    if (node.level === 0) {
      node.x = parentX;
      node.y = parentY;
    } else {
      const angleOffset = (index - totalSiblings / 2) * (Math.PI / (totalSiblings + 1));
      node.x = parentX + Math.cos(angle + angleOffset) * radius;
      node.y = parentY + Math.sin(angle + angleOffset) * radius;
    }

    if (node.expanded && node.children.length > 0) {
      node.children.forEach((child, idx) => {
        calculatePositions(
          child,
          node.x,
          node.y,
          angle + angleOffset,
          radius * 0.6,
          idx,
          node.children.length
        );
      });
    }
  };

  // Render mind map recursively
  const renderNode = (node: MindMapNode, parentNode?: MindMapNode): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    // Calculate positions
    if (node.level === 0 && currentMindMap) {
      calculatePositions(node, 500, 300, 0, 200, 0, 1);
    }

    // Draw connection line to parent
    if (parentNode) {
      elements.push(
        <line
          key={`line-${node.id}`}
          x1={parentNode.x}
          y1={parentNode.y}
          x2={node.x}
          y2={node.y}
          stroke="url(#lineGradient)"
          strokeWidth="2"
          className="transition-all duration-300"
        />
      );
    }

    // Draw node
    const nodeColor =
      node.level === 0
        ? "from-green-500 to-green-600"
        : node.level === 1
        ? "from-blue-500 to-cyan-500"
        : "from-emerald-500 to-teal-500";

    elements.push(
      <g key={`node-${node.id}`} className="cursor-pointer group">
        <foreignObject
          x={node.x - 80}
          y={node.y - 25}
          width="160"
          height="50"
          onClick={() => toggleNode(node.id)}
        >
          <div
            className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${nodeColor} rounded-2xl px-4 py-2 shadow-lg transition-all duration-300 hover:scale-105`}
          >
            <span className="text-white text-sm font-medium text-center line-clamp-2">
              {node.label}
            </span>
          </div>
        </foreignObject>

        {/* Expand/Collapse indicator */}
        {node.children.length > 0 && (
          <circle
            cx={node.x + 80}
            cy={node.y}
            r="8"
            fill="#1e293b"
            stroke="#64748b"
            strokeWidth="2"
            className="cursor-pointer"
            onClick={() => toggleNode(node.id)}
          />
        )}
        {node.children.length > 0 && (
          <text
            x={node.x + 80}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#94a3b8"
            fontSize="12"
            className="cursor-pointer select-none"
            onClick={() => toggleNode(node.id)}
          >
            {node.expanded ? "−" : "+"}
          </text>
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
  };

  // Handle zoom
  const handleZoom = (delta: number) => {
    setScale((prev) => Math.max(0.5, Math.min(2, prev + delta)));
  };

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Export mind map as image
  const exportMindMap = () => {
    alert("Export feature coming soon!");
  };

  return (
    <div className="flex h-screen bg-black">
      {/* History Sidebar */}
      {showHistory && (
        <div className="w-80 bg-gray-950 border-r border-green-500/20 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Mind Maps</h2>
            <button
              onClick={() => setShowHistory(false)}
              className="text-green-200/70 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {savedMindMaps.map((map) => (
              <div
                key={map.id}
                onClick={() => {
                  setCurrentMindMap(map);
                  setShowHistory(false);
                }}
                className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-green-500/30/50 cursor-pointer hover:border-green-500/50 transition-all duration-300"
              >
                <h3 className="text-white font-medium mb-1 line-clamp-1">{map.title}</h3>
                <p className="text-green-200/70 text-sm line-clamp-2">{map.source}</p>
                <p className="text-green-300/50 text-xs mt-2">
                  {new Date(map.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-green-500/30/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Mind Map Generator</h1>
              <p className="text-green-200/70">Transform your notes into visual knowledge maps</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {!currentMindMap ? (
            // Upload Section
            <div className="h-full flex items-center justify-center p-8">
              <div className="max-w-2xl w-full space-y-6">
                {/* Upload Method Selection */}
                {!uploadMethod && (
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl mb-4">
                      <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Create Your Mind Map</h2>
                    <p className="text-green-200/70">Choose how you want to upload your content</p>

                    <div className="grid grid-cols-3 gap-4 mt-8">
                      <button
                        onClick={() => setUploadMethod("text")}
                        className="group p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-purple-500/20 hover:to-pink-500/20 rounded-3xl border border-green-500/30/50 hover:border-green-500/50 transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-white font-medium">Paste Text</span>
                        </div>
                      </button>

                      <button
                        onClick={() => setUploadMethod("file")}
                        className="group p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-blue-500/20 hover:to-cyan-500/20 rounded-3xl border border-green-500/30/50 hover:border-green-500/50 transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <span className="text-white font-medium">Upload File</span>
                        </div>
                      </button>

                      <button
                        onClick={() => setUploadMethod("url")}
                        className="group p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-emerald-500/20 hover:to-teal-500/20 rounded-3xl border border-green-500/30/50 hover:border-emerald-500/50 transition-all duration-300"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </div>
                          <span className="text-white font-medium">From URL</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Input Form */}
                {uploadMethod && (
                  <div className="space-y-4">
                    <button
                      onClick={() => setUploadMethod(null)}
                      className="text-green-200/70 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back
                    </button>

                    <div className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-green-500/30/50">
                      <h3 className="text-white font-semibold mb-4">
                        {uploadMethod === "text" && "Paste Your Content"}
                        {uploadMethod === "file" && "Upload a File"}
                        {uploadMethod === "url" && "Enter URL"}
                      </h3>

                      {uploadMethod === "text" && (
                        <textarea
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="Paste your notes, article, or any text you want to visualize..."
                          className="w-full h-64 px-4 py-3 bg-gray-900/50 border border-green-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                        />
                      )}

                      {uploadMethod === "file" && (
                        <div className="border-2 border-dashed border-green-500/30 rounded-2xl p-12 text-center hover:border-green-500/50 transition-colors cursor-pointer">
                          <svg className="w-12 h-12 text-green-300/50 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-green-200/70">Drop files here or click to browse</p>
                          <p className="text-green-300/50 text-sm mt-2">PDF, DOCX, TXT up to 10MB</p>
                        </div>
                      )}

                      {uploadMethod === "url" && (
                        <input
                          type="url"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="https://example.com/article"
                          className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        />
                      )}

                      <button
                        onClick={generateMindMap}
                        disabled={!inputText.trim() || isGenerating}
                        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Generating Mind Map...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Generate Mind Map
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Mind Map Viewer
            <div className="relative h-full bg-black">
              {/* Controls */}
              <div className="absolute top-6 right-6 z-10 flex gap-3">
                <div className="bg-gray-800/90 backdrop-blur rounded-2xl p-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleZoom(0.1)}
                    className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                    title="Zoom In"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleZoom(-0.1)}
                    className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                    title="Zoom Out"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setScale(1);
                      setOffset({ x: 0, y: 0 });
                    }}
                    className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                    title="Reset View"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>

                <div className="bg-gray-800/90 backdrop-blur rounded-2xl p-2 flex flex-col gap-2">
                  <button
                    onClick={exportMindMap}
                    className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                    title="Export"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentMindMap(null)}
                    className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                    title="New Mind Map"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <div
                ref={canvasRef}
                className="w-full h-full overflow-hidden cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <svg
                  width="100%"
                  height="100%"
                  className="select-none"
                  style={{
                    transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
                  }}
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  {currentMindMap && renderNode(currentMindMap.rootNode)}
                </svg>
              </div>

              {/* Info Panel */}
              <div className="absolute bottom-6 left-6 bg-gray-800/90 backdrop-blur rounded-2xl p-4 max-w-xs">
                <h3 className="text-white font-semibold mb-2">{currentMindMap.title}</h3>
                <p className="text-green-200/70 text-sm mb-3 line-clamp-2">{currentMindMap.source}</p>
                <div className="flex items-center gap-2 text-green-300/50 text-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Click nodes to expand/collapse • Drag to pan • Scroll to zoom
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
