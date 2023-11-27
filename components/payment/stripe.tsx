import {
  BillingDetails,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { Center, Button, VStack } from "native-base";
import React from "react";
import { View, Text } from "react-native";

export default function Stripe() {
  const [card, setCard] = React.useState<any>(null);
  const { confirmPayment, loading } = useConfirmPayment();
  const API_URL = "http://localhost:3000";
  const clientSecret = "sk_test_4eC39HqLyjWDarjtT1zdp7dc";

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "usd",
      }),
    });
    const { clientSecret } = await response.json();

    return clientSecret;
  };

  const handlePayPress = async () => {
    if (!card) {
      const clientSecret = await fetchPaymentIntentClientSecret();
      return;
    }
    const billingDetails: BillingDetails = {
      email: "jenny.rosen@example.com",
    };
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails,
      },
    });
    if (error) {
      console.log("Payment confirmation error", error.message);
    } else if (paymentIntent) {
      alert("Payment successful " + paymentIntent);
    }
  };

  return (
    <View>
      <VStack space={1}>
        <Text className=" font-semibold text-white ">
          Detalles de la tarjeta
        </Text>
        <CardField
          postalCodeEnabled={true}
          autofocus
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
            borderRadius: 7,
          }}
          style={{
            width: "100%",
            height: 40,
            marginVertical: 10,
          }}
          onCardChange={(cardDetails) => {
            console.log("cardDetails", cardDetails);
            setCard(cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log("focusField", focusedField);
          }}
        />
      </VStack>

      <Center>
        <Button
          disabled={loading}
          onPress={handlePayPress}
          colorScheme="accent"
          marginTop={16}
          rounded={7}
        >
          <Text className="font-semibold px-5 py-1">Realizar Compra</Text>
        </Button>
      </Center>
    </View>
  );
}
