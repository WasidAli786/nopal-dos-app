import PaymentInputUI from "@/components/common/PaymentInputUI";
import { useFormContext } from "react-hook-form";

const PaymentInfoForm = () => {
  const { control, setError } = useFormContext();
  return (
    <>
      <PaymentInputUI
        name="card_no"
        label="Card number"
        placeholder="0000 0000 0000 0000"
        placement="outside"
        size="lg"
        variant="bordered"
        fieldType="cardNumber"
        control={control}
        setError={setError}
      />
      <div className="grid grid-cols-2 gap-6">
        <PaymentInputUI
          name="expiry_date"
          label="Expiry Date"
          placeholder="MM/YY"
          placement="outside"
          size="lg"
          variant="bordered"
          fieldType="expiryDate"
          control={control}
          setError={setError}
        />
        <PaymentInputUI
          name="cvc"
          label="Security Code"
          placeholder="CVC"
          placement="outside"
          size="lg"
          variant="bordered"
          fieldType="cvc"
          control={control}
          setError={setError}
        />
      </div>
    </>
  );
};

export default PaymentInfoForm;
