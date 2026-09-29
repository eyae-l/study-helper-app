// Initialize demo data for development
import { ApiClient } from './api-client';
import { getDemoUserId } from './demo-user';

export async function initializeDemoStudySet() {
  const userId = getDemoUserId();
  
  try {
    // Call the initialization endpoint
    const res = await fetch('/api/init-demo', {
      method: 'POST',
    });

    if (!res.ok) {
      console.warn('Demo data initialization endpoint not available (non-critical)');
      return null;
    }

    const data = await res.json();
    console.log(data.message);
    return data.studySet;
  } catch (error) {
    console.warn('Demo data initialization skipped (database not configured)');
    return null;
  }
}

export async function getDemoStudySet() {
  const userId = getDemoUserId();
  
  try {
    const studySets = await ApiClient.getStudySets(userId);
    
    if (studySets.length === 0) {
      return await initializeDemoStudySet();
    }
    
    return studySets[0];
  } catch (error) {
    console.error('Failed to get demo study set:', error);
    return null;
  }
}
