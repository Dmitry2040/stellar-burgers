import { useLocation } from 'react-router-dom';

export const getOrderNumber = () => {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname.includes('feed')) {
    return pathname.replace('/feed/', '');
  }

  if (pathname.includes('profile/orders')) {
    return pathname.replace('/profile/orders/', '');
  }
};
