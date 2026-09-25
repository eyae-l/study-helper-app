import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch user's flashcard decks
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    const decks = await db.getFlashcardDecks(parseInt(userId));

    return NextResponse.json({ decks });
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flashcards' },
      { status: 500 }
    );
  }
}

// POST - Create new flashcard deck
export async function POST(request: Request) {
  try {
    const { userId, title, sourceMaterial, cards } = await request.json();

    if (!userId || !title || !cards || !Array.isArray(cards)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create deck
    const deck = await db.createFlashcardDeck(userId, title, sourceMaterial || '');

    // Create cards
    for (let i = 0; i < cards.length; i++) {
      await db.createFlashcard(deck.id, cards[i].question, cards[i].answer, i);
    }

    // Update deck card count
    await db.query(`
      UPDATE flashcard_decks 
      SET card_count = $1 
      WHERE id = $2
    `, [cards.length, deck.id]);

    // Log usage
    await db.logUsage(userId, 'Flashcards', 'create_deck', { 
      deckId: deck.id, 
      cardCount: cards.length 
    });

    return NextResponse.json({
      success: true,
      deck: { ...deck, card_count: cards.length }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to create flashcards' },
      { status: 500 }
    );
  }
}
