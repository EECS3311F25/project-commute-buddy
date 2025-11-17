// backend/utils/matchCalculator.js

/**
 * Calculates the common route percentage between two users
 * Formula: (sharedRoutes / max(user1Routes.length, user2Routes.length)) * 100
 * @param {Array<String>} user1Routes - First user's preferred routes
 * @param {Array<String>} user2Routes - Second user's preferred routes
 * @returns {Number} - Percentage (0-100)
 */
export const calculateCommonRoutePercentage = (user1Routes, user2Routes) => {
  // Handle empty arrays
  if (!user1Routes || !user2Routes || user1Routes.length === 0 || user2Routes.length === 0) {
    return 0;
  }

  // Find shared routes (intersection)
  const sharedRoutes = user1Routes.filter(route => user2Routes.includes(route));
  
  // Calculate percentage based on maximum route count
  const maxRoutes = Math.max(user1Routes.length, user2Routes.length);
  
  if (maxRoutes === 0) return 0;
  
  const percentage = (sharedRoutes.length / maxRoutes) * 100;
  return Math.round(percentage); 
};

