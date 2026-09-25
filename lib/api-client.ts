// Client-side API helpers for making requests to backend

export class ApiClient {
  private static baseUrl = '/api';

  // Study Sets
  static async getStudySets(userId: string) {
    const res = await fetch(`${this.baseUrl}/study-sets?userId=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch study sets');
    return res.json();
  }

  static async createStudySet(data: {
    title: string;
    description?: string;
    subject: string;
    userId: string;
    isPublic?: boolean;
  }) {
    const res = await fetch(`${this.baseUrl}/study-sets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create study set');
    return res.json();
  }

  static async deleteStudySet(id: string) {
    const res = await fetch(`${this.baseUrl}/study-sets?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete study set');
    return res.json();
  }

  // Flashcards
  static async getFlashcards(studySetId: string, userId: string) {
    const res = await fetch(
      `${this.baseUrl}/flashcards?studySetId=${studySetId}&userId=${userId}`
    );
    if (!res.ok) throw new Error('Failed to fetch flashcards');
    return res.json();
  }

  static async generateFlashcards(data: {
    content: string;
    count: number;
    studySetId: string;
    userId: string;
  }) {
    const res = await fetch(`${this.baseUrl}/flashcards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to generate flashcards');
    }
    return res.json();
  }

  static async updateFlashcard(data: {
    id: string;
    front?: string;
    back?: string;
    difficulty?: number;
    nextReview?: Date;
  }) {
    const res = await fetch(`${this.baseUrl}/flashcards`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update flashcard');
    return res.json();
  }

  static async deleteFlashcard(id: string) {
    const res = await fetch(`${this.baseUrl}/flashcards?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete flashcard');
    return res.json();
  }

  // Quizzes
  static async getQuizzes(studySetId: string, userId: string) {
    const res = await fetch(
      `${this.baseUrl}/quizzes?studySetId=${studySetId}&userId=${userId}`
    );
    if (!res.ok) throw new Error('Failed to fetch quizzes');
    return res.json();
  }

  static async generateQuiz(data: {
    content: string;
    title: string;
    difficulty: string;
    count: number;
    studySetId: string;
    userId: string;
  }) {
    const res = await fetch(`${this.baseUrl}/quizzes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to generate quiz');
    }
    return res.json();
  }

  static async updateQuiz(data: {
    id: string;
    completed?: boolean;
    totalScore?: number;
  }) {
    const res = await fetch(`${this.baseUrl}/quizzes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update quiz');
    return res.json();
  }

  static async deleteQuiz(id: string) {
    const res = await fetch(`${this.baseUrl}/quizzes?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete quiz');
    return res.json();
  }

  // AI Features
  static async solveProblem(question: string, subject: string = 'general') {
    const res = await fetch(`${this.baseUrl}/ai/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, subject }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to solve problem');
    }
    return res.json();
  }

  static async generateMindMap(content: string) {
    const res = await fetch(`${this.baseUrl}/ai/mindmap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to generate mind map');
    }
    return res.json();
  }

  static async generateSummary(content: string, length: 'short' | 'medium' | 'long' = 'medium') {
    const res = await fetch(`${this.baseUrl}/ai/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, length }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to generate summary');
    }
    return res.json();
  }

  static async generateSmartNotes(content: string) {
    const res = await fetch(`${this.baseUrl}/ai/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to generate notes');
    }
    return res.json();
  }
}
