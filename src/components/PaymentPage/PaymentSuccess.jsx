import React, { useEffect } from "react";

const PaymentSuccess = () => {
    
  useEffect(() => {
    const stripe = Stripe(
      "pk_test_51ObGiOJkhjSZpISfpScmwtvtd5sNPTV8FybsRsUm2z1m7w0a0nMCW3vGfRN3Ck00PSyMY0VtrpjIfCjIVHAoHkqb00ZqI3IXnS"
    );

    const handlePaymentSuccess = async (event) => {
      // Проверьте, что событие - это успешный платеж
      if (event.paymentIntent.status === "succeeded") {
        // Платеж успешен, выполните необходимые действия, например, обновите состояние компонента
        console.log("Платеж успешен!", event.paymentIntent.id);

        // Здесь вы можете выполнить дополнительные действия, например, перенаправить пользователя
        // window.location.href = '/success-page'; // Замените '/success-page' на вашу страницу успеха
      }
    };

    // Подпишитесь на событие payment_intent.succeeded
    stripe.confirmation
      .elements()
      .addEventListener("payment_intent.succeeded", handlePaymentSuccess);

    // Очистите обработчик при размонтировании компонента
    return () => {
      stripe.confirmation
        .elements()
        .removeEventListener("payment_intent.succeeded", handlePaymentSuccess);
    };
  }, []);

  return (
    <div>
      <p>Обработка успешного платежа...</p>
    </div>
  );
};

export default PaymentSuccess;
