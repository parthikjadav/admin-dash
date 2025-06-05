"use client";

import React, { useEffect } from "react";
import BackButton from "../../BackButton";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CANCELLATION_CHARGE_TYPE,
  CAPACITY_TYPE,
  EARLY_REGISTRATION_DISCOUNT_TYPE,
  PRICING_TYPE,
  REGISTRATION_TYPE,
} from "@/constants";
import RadioField from "../common/RadioField";
import { PricingFormSchema, PricingFromType } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import SwitchField from "../common/SwitchField";
import { Separator } from "@/components/ui/separator";
import SelectField from "../common/SelectField";
import { Button } from "@/components/ui/button";
import InputField from "../common/InputField";

const PricingStep = () => {
  const form = useForm({
    resolver: zodResolver(PricingFormSchema),
    defaultValues: {
      paymentType: PRICING_TYPE.PAID,
      refundPolicy: false,
      earlyRegistrationDiscount: true,
      capacityType: CAPACITY_TYPE.UNLIMITED,
      ticketPrice: "",
      onlineTicketDiscount: "",
      collectionCharge: "",
      cancellationChargeType: CANCELLATION_CHARGE_TYPE.FIXED,
      earlyRegistrationAmount: "",
      earlyRegistrationDiscountType: EARLY_REGISTRATION_DISCOUNT_TYPE.FIXED,
    },
  });

  const showPricing = form.watch("paymentType") === PRICING_TYPE.PAID;
  const priceFree = form.watch("paymentType") === PRICING_TYPE.FREE;
  const showRefundPolicy = form.watch("refundPolicy");
  const showRegistrationDiscount = form.watch("earlyRegistrationDiscount");

  useEffect(() => {
    if (priceFree) {
      form.setValue("ticketPrice", "0");
      form.setValue("onlineTicketDiscount", "0");
    } else if (!showRefundPolicy) {
      form.setValue("collectionCharge", "0");
    } else if (!showRegistrationDiscount) {
      form.setValue("earlyRegistrationAmount", "0");
    }
  }, [priceFree, showRefundPolicy, showRegistrationDiscount]);

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div className="py-8">
        <Form {...form}>
          <form id="pricing-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <div className="pricing mb-8">
                <div className="event-heading pb-4">
                  <h3 className="eh3">Event Pricing</h3>
                </div>
                <RadioField
                  control={form.control}
                  name="paymentType"
                  label="Payment Type"
                  values={Object.values(PRICING_TYPE)}
                />
                {showPricing && <PricingInputFields control={form.control} />}
              </div>
              <Separator />
              <div className="refund py-8">
                <SwitchField
                  control={form.control}
                  name="refundPolicy"
                  label="Refund Policy"
                  description="If enabled, the event is refundable, but a cancellation fee will apply."
                />
                {showRefundPolicy && (
                  <RefundInputFields control={form.control} />
                )}
              </div>
              <Separator />
              <div className="registration py-8">
                <SwitchField
                  control={form.control}
                  name="earlyRegistrationDiscount"
                  label="Early Registration Discount"
                  description="Offer special pricing for early registrations"
                />
                {showRegistrationDiscount && (
                  <RegisterDiscountInputFields control={form.control} />
                )}
              </div>
              <Separator />
              <div className="attendance py-8 space-y-6">
                <div>
                  <h3 className="eh3">Attendance Options</h3>
                  <span className="e-desc">
                    Offer special pricing for early registrations
                  </span>
                </div>
                <SelectField
                  label="Registration Type"
                  control={form.control}
                  name="registrationType"
                  values={Object.values(REGISTRATION_TYPE)}
                />
                <RadioField
                  control={form.control}
                  name="capacityType"
                  label="Capacity Type"
                  description="Set maximum attendance capacity"
                  values={Object.values(CAPACITY_TYPE)}
                />
              </div>
            </div>
          </form>
        </Form>
        <Button variant={"normal"} type="submit" form="pricing-form">
          Submit
        </Button>
      </div>
    </>
  );
};

export default PricingStep;

const RefundInputFields = ({ control }: { control: any }) => {
  return (
    <div className="mt-6 flex w-full gap-x-5">
      <div className="w-1/3">
        <SelectField
          control={control}
          name="cancellationChargeType"
          label="Cancellation Charge Type"
          className="w-full"
          values={Object.values(CANCELLATION_CHARGE_TYPE)}
        />
      </div>
      <InputField
        control={control}
        name="collectionCharge"
        label="Cancellation Charge"
        type="number"
      />
    </div>
  );
};

const PricingInputFields = ({ control }: { control: any }) => {
  return (
    <div className="mt-6 flex w-full gap-x-5">
      <InputField
        control={control}
        name=""
        label="Ticket Price (USD)"
        required
        type="number"
      />
      <InputField
        control={control}
        name="onlineTicketDiscount"
        label="Online Payment Discount (%)"
        type="number"
      />
    </div>
  );
};

const RegisterDiscountInputFields = ({ control }: { control: any }) => {
  return (
    <div className="mt-6 flex w-full gap-x-5">
      <div className="w-1/3">
        <SelectField
          control={control}
          name="earlyRegistrationDiscountType"
          label="Dance Style"
          required
          className="w-full"
          values={Object.values(CANCELLATION_CHARGE_TYPE)}
        />
      </div>
      <InputField
        control={control}
        name="earlyRegistrationAmount"
        label="Amount"
        required
        type="number"
      />
    </div>
  );
};
