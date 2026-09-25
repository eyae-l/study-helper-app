// Demo user for development
// In production, this would come from authentication

export const DEMO_USER = {
  id: "demo-user-123",
  email: "demo@studyhelper.com",
  name: "Demo User",
};

export const getDemoUserId = () => DEMO_USER.id;
export const getDemoUser = () => DEMO_USER;
