import getStripe from './lib/getStripe';

export default function Home() {
  async function handleCheckout() {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1Mie43LnB2P76WokLrs26CJP',
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `http://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancel`,
      customerEmail: 'customer@email.com',
    });
    console.warn(error.message);
  }

  return <button onClick={handleCheckout}>Checkout</button>;
}