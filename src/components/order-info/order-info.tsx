import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchAllIngredients,
  selectedAllIngredients
} from '../../services/ingredientSlice';
import { useParams } from 'react-router-dom';
import { orderSelect } from '../../services/orderSlice';
import { fetchOrderDetails, resetOrderModal } from '../../services/orderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const orderNumber = number ? parseInt(number, 10) : undefined;

  const orderData = useSelector(orderSelect);
  console.log(orderData);
  const dispatch = useDispatch();

  const ingredients = useSelector(selectedAllIngredients);
  useEffect(() => {
    dispatch(fetchAllIngredients());
    if (orderNumber) {
      dispatch(fetchOrderDetails(orderNumber));
    }
    return () => {
      dispatch(resetOrderModal());
    };
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;
    const date = new Date(orderData.createdAt);
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  return <OrderInfoUI orderInfo={orderInfo} />;
};
