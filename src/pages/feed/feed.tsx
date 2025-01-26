import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { selectAllOrders } from '../../services/feedsSlice';
import { useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/feedsSlice';
import { useDispatch } from '../../services/store';
import { selectIsLoading } from '../../services/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectAllOrders);
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(fetchFeeds()); // Загрузите данные при монтировании компонента
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
