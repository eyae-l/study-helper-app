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
      throw new Error('Failed to initialize demo data');
    }

    const data = await res.json();
    console.log(data.message);
    return data.studySet;
  } catch (error) {
    console.error('Failed to initialize demo data:', error);
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
