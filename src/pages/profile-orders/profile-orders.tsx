import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchOrdersProfile, ordersProfile } from '../../services/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersProfile) || null;
  const { number } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersProfile());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
