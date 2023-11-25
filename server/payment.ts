import { supabase } from "@/utils/supabase";

export const createPayment = async (data: any) => {
  const stripe = require("stripe")(
    "sk_test_51OGJbRE2wfNmTsrPSGh3Tfg1cgDSToqyKrg4JDwaZYQtfM4xsra3k9jFgsTsTl2eAZJ3AmhmENrPKbWel8ufvKu500uYoaf1jK"
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "mxn",
    payment_method_types: ["card"],
  });
  const clientSecret = paymentIntent.client_secret;
  const { data: payment, error } = await supabase
    .from("payments")
    .insert(data)
    .single();

  if (error) {
    throw error;
  }

  return payment;
};

export const getPayments = async () => {
  const { data: payments, error } = await supabase.from("payments").select();

  if (error) {
    throw error;
  }

  return payments;
};
