import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51LkOyDLnB2P76WokEfKFCTzGQnwuKxTfJp0ekLHWZlk9NsoL1voCD6CR83vv3ROmBh2parlkagZFakdVKXwVZha300AAiRbtcW");
  }
  return stripePromise;
};

export default getStripe;