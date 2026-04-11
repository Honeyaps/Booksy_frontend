import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export const Step2 = () => {
    return (
       
             <div>
                <h4>Payment</h4>
                        <PayPalScriptProvider options={{ "client-id": "AaYP9dDt58Hkv4iPLQPjRhPcjssC10HP53nCUbpjJqYqo--9LaueYZGH7UMzs_wsbvjjzxFSDCdWkcNj" }}>
                            <div>
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [{
                                                amount: {
                                                    value: "100.00" // Payment amount in USD
                                                },
                                            }],
                                        });
                                    }}
                                    onApprove={async (data, actions) => {
                                        const order = await actions.order.capture();
                                        console.log('Payment Approved: ', order);

                                        // Send order details to your backend (order.id and other details)
                                        // Example: fetch('/api/save-payment', { method: 'POST', body: JSON.stringify(order) });
                                        alert(`Transaction completed by ${order.payer.name.given_name}`);
                                    }}
                                    onError={(err) => {
                                        console.error('Payment Error: ', err);
                                    }}
                                />
                            </div>
                            <div className="mt-5">
                                <h1 className="text-center text-muted">Coming Soon</h1>
                            </div>
                        </PayPalScriptProvider>
                    </div>
      
    )

}