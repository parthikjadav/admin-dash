"use client";

import React, { useEffect, useState } from "react";
import BackButton from "../BackButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Asterisk, Cross, Minus, Plus, X } from "lucide-react";
import { CustomComboBox } from "@/components/CustomComboBox";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar, CustomCalender } from "@/components/ui/calendar";
import {
  CustomPopoverContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { COUNTDOWN_TIME, EVENT_TYPES, time, timezones } from "@/constants";
import {
  RadioGroup,
  RadioGroupItem,
  TimingGroupItem,
} from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  CustomSelectContent,
  CustomSelectItem,
  Select,
  SelectContent,
  SelectCustomUpTrigger,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateFormSchema, DateFormSchemaType } from "@/validation";
import { createEventTiming } from "@/actions/event";
import { toast } from "sonner";
import useTimingStore from "@/store/timing";
import useStepsStore from "@/store/stepper";
import useEventFormStore from "@/store/eventForm";

interface TimingType {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

const DateStep = () => {

  const timing = useTimingStore((state) => state.timing);
  const currentStep = useStepsStore((state) => state.stepCount);
  const eventId = useEventFormStore((state) => state.eventID);

  const setCurrentStep = useStepsStore((state) => state.setStepCount);
  const setTiming = useTimingStore((state) => state.setTiming);

  const form = useForm<DateFormSchemaType>({
    resolver: zodResolver(DateFormSchema),
    defaultValues: {
      timezone: timing?.timezone || "",
      eventType: timing?.eventType || EVENT_TYPES.SINGLE,
      countDownTimer: timing?.countDownTimer || COUNTDOWN_TIME.ENABLED,
      timings: timing?.timings || [
        {
          startDate: new Date(),
          startTime: "12:00",
          endDate: new Date(),
          endTime: "12:00",
        },
      ],
    },
  });

  console.log(timing?.timings, "timing");


  const watchOnEventType = form.watch("eventType");
  const watchOnCountdown = form.watch("countDownTimer");

  const showMultipleTimings = watchOnEventType === EVENT_TYPES.MULTIPLE;
  const showCountDown = watchOnCountdown === COUNTDOWN_TIME.ENABLED;

  const [timingState, setTimingState] = useState<TimingType[]>(timing?.timings || form.watch("timings"));

  const timingMap = timingState.map(() => false)
  const [openPopoverIndexes, setOpenPopoverIndexes] = useState<boolean[]>(timingMap);
  const [endOpenPopoverIndexes, setEndOpenPopoverIndexes] = useState<boolean[]>(timingMap);

  useEffect(() => {
    form.setValue("timings", timingState, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [timingState]);

  // If timingState can change size, sync openPopoverIndexes:
  useEffect(() => {
    if (openPopoverIndexes.length !== timingState.length) {
      const map = timingState.map(() => false);
      setOpenPopoverIndexes(map);
      setEndOpenPopoverIndexes(map);
    }
  }, [timingState]);

  useEffect(() => {
    if (watchOnEventType === EVENT_TYPES.SINGLE) {
      setTimingState([timingState[0]]);
    }
  }, [watchOnEventType]);

  // useEffect(() => {
  //   if (timing) {
  //     form.reset({
  //       timezone: timing.timezone || "",
  //       eventType: timing.eventType || EVENT_TYPES.SINGLE,
  //       countDownTimer: timing.countDownTimer || COUNTDOWN_TIME.ENABLED,
  //       timings: (timing?.timings ?? []).map(t => ({
  //         startDate: new Date(t.startDate),
  //         startTime: t.startTime,
  //         endDate: new Date(t.endDate),
  //         endTime: t.endTime,
  //       })),
  //     });
  //   }
  // }, [timing, form]);

  console.log(JSON.stringify(form.getValues()), 'form.values');


  async function onSubmit(data: DateFormSchemaType) {
    console.log(data);
    if (!data || !eventId) return;

    const res = await createEventTiming(data, eventId);

    if (!res) {
      toast("Failed to create event timing")
      return
    }
    if (currentStep) {
      toast("Timing saved successfully")
      setCurrentStep(currentStep + 1)
      setTiming(res)
    }
  }

  useEffect(() => {
    form.setValue("timings", timingState);
  }, [timingState]);

  return (
    <>
      <div className="py-8">
        <Form {...form}>
          <form
            id="date-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:space-y-3 space-y-5"
          >
            <div className="event-heading">
              <h3 className="font-semibold text-lg tracking-wide text-side-blue">
                Event Timing{" "}
              </h3>
            </div>
            <div className="md:flex my-5 space-y-5 gap-4 items-start justify-between">
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3">
                    <FormLabel className="e-formt font-normal">
                      Timezone
                      <Asterisk color="red" size={14} />
                    </FormLabel>
                    <div className="flex gap-2 w-full">
                      <FormControl>
                        <CustomComboBox
                          label="Timezone"
                          width="w-[300px]"
                          defaultValue={field.value}
                          onChange={field.onChange}
                          values={timezones}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <div>
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-[14px] text-side-blue font-normal">
                      Event Type <Asterisk color="red" size={14} />
                    </FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-5"
                    >
                      {Object.values(EVENT_TYPES).map((val: string, ind) => (
                        <FormItem key={ind} className="flex items-center gap-3">
                          <FormControl className="p-3!">
                            <TimingGroupItem value={val} />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {val}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <div>
              <FormField
                control={form.control}
                name="countDownTimer"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-[14px] text-side-blue font-normal">
                      Countdown Status <Asterisk color="red" size={14} />
                    </FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-5"
                    >
                      {Object.values(COUNTDOWN_TIME).map((val: string, ind) => (
                        <FormItem key={ind} className="flex items-center gap-3">
                          <FormControl className="p-3!">
                            <TimingGroupItem value={val} />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {val}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
          </form>
        </Form>
        <div className="flex flex-col space-y-5 mt-5 mb-10">
          {showCountDown &&
            timingState.map((val, ind) => (
              <div key={ind}>
                {ind !== 0 && (
                  <div className="border border-dashed custom-dashed-border border-gray-200 mb-4"></div>
                )}
                <div className="flex flex-col md:flex-row gap-5">
                  {showMultipleTimings && (
                    <h4 className="mt-7 me-5 text-[20px] font-semibold text-side-blue">
                      {ind + 1}
                    </h4>
                  )}
                  <div className="flex gap-4 items-center">
                    <div className="space-x-5">
                      <span className="text-[14px] text-side-blue font-normal mb-2 flex items-center gap-2">
                        Start Date & Time <Asterisk color="red" size={14} />
                      </span>
                      <div className="flex items-center gap-4">
                        <Popover
                          open={openPopoverIndexes[ind]}
                          onOpenChange={(isOpen) => {
                            setOpenPopoverIndexes((prev) => {
                              const arr = [...prev];
                              arr[ind] = isOpen;
                              return arr;
                            });
                          }}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[200px] justify-between px-2 py-5 text-side-blue text-[12px] rounded-full! data-[state=open]:border-green-500 text-left font-normal",
                                !val.startDate && "text-muted-foreground"
                              )}
                            >
                              {format(val.startDate, "PP")}
                              <CalendarIcon size={24} />
                            </Button>
                          </PopoverTrigger>
                          <CustomPopoverContent
                            className="w-auto p-0"
                            align="center"
                          >
                            <CustomCalender
                              mode="single"
                              selected={val.startDate}
                              onSelect={(date: any) =>
                                setTimingState(() => {
                                  return timingState.map((item, index) =>
                                    index === ind
                                      ? { ...item, startDate: date }
                                      : item
                                  );
                                })
                              }
                              initialFocus
                            />
                            <div className="px-4 flex flex-col justify-end">
                              <Separator className="" />
                              <Button
                                onClick={() => {
                                  setTimingState(() => {
                                    return timingState.map((item, index) =>
                                      index === ind
                                        ? { ...item, startDate: new Date() }
                                        : item
                                    );
                                  });
                                  setOpenPopoverIndexes((prev) => {
                                    const arr = [...prev];
                                    arr[ind] = false; // << CLOSE this popover
                                    return arr;
                                  });
                                }}
                                variant={"normalGray"}
                                size={"md"}
                                className="self-end my-4"
                              >
                                Clear
                              </Button>
                            </div>
                          </CustomPopoverContent>
                        </Popover>
                        <span className="text-[12px]">at</span>
                        <Select defaultValue={timingState[ind].startTime}
                          onValueChange={(val) =>
                            setTimingState(() => {
                              return timingState.map((item, i) =>
                                ind === i ? { ...item, startTime: val } : item
                              );
                            })
                          }
                        >
                          <SelectCustomUpTrigger className="w-[120px] py-5 rounded-full text-[12px] data-[state=open]:border-green-500">
                            <SelectValue placeholder="12:00 PM" />
                          </SelectCustomUpTrigger>
                          <CustomSelectContent>
                            <div className="flex-c px-4 mb-2 justify-between">
                              <h6 className="text-lg font-semibold text-side-blue">
                                {
                                  timingState.filter((item, i) => ind === i)[0]
                                    .startTime
                                }{" "}
                                PM
                              </h6>
                              <Button variant={"ghost"}>
                                <X />
                              </Button>
                            </div>
                            <Separator className="mb-4" />
                            {time.map((time, i) => (
                              <CustomSelectItem key={i} value={time}>
                                {time} PM
                              </CustomSelectItem>
                            ))}
                          </CustomSelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block line w-5 border-b my-5 border-dashed border-gray-400"></div>
                  <div>
                    <div className="space-x-5">
                      <span className="text-[14px] text-side-blue font-normal mb-2 flex items-center gap-2">
                        End Date & Time <Asterisk color="red" size={14} />
                      </span>
                      <div className="flex items-center gap-4">
                        <Popover
                          open={endOpenPopoverIndexes[ind]}
                          onOpenChange={(isOpen) => {
                            setEndOpenPopoverIndexes((prev) => {
                              const arr = [...prev];
                              arr[ind] = isOpen;
                              return arr;
                            });
                          }}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[200px] justify-between px-2 py-5 text-side-blue text-[12px] rounded-full! data-[state=open]:border-green-500 text-left font-normal",
                                !val.endDate && "text-muted-foreground"
                              )}
                            >
                              {format(val.endDate, "PP")}
                              <CalendarIcon size={24} />
                            </Button>
                          </PopoverTrigger>
                          <CustomPopoverContent
                            className="w-auto p-0"
                            align="center"
                          >
                            <CustomCalender
                              mode="single"
                              selected={val.endDate}
                              onSelect={(date: any) =>
                                setTimingState(() => {
                                  return timingState.map((item, index) =>
                                    index === ind
                                      ? { ...item, endDate: date }
                                      : item
                                  );
                                })
                              }
                              initialFocus
                            />
                            <div className="px-4 flex flex-col justify-end">
                              <Separator className="" />
                              <Button
                                onClick={() => {
                                  setTimingState(() => {
                                    return timingState.map((item, index) =>
                                      index === ind
                                        ? { ...item, endDate: new Date() }
                                        : item
                                    );
                                  });
                                  setEndOpenPopoverIndexes((prev) => {
                                    const arr = [...prev];
                                    arr[ind] = false; // << CLOSE this popover
                                    return arr;
                                  });
                                }}
                                variant={"normalGray"}
                                size={"md"}
                                className="self-end my-4"
                              >
                                Clear
                              </Button>
                            </div>
                          </CustomPopoverContent>
                        </Popover>
                        <span className="text-[12px]">at</span>
                        <Select defaultValue={timingState[ind].endTime}
                          onValueChange={(val) =>
                            setTimingState(() => {
                              return timingState.map((item, i) =>
                                ind === i ? { ...item, endTime: val } : item
                              );
                            })
                          }
                        >
                          <SelectCustomUpTrigger className="w-[120px] py-5 rounded-full text-[12px] data-[state=open]:border-green-500">
                            <SelectValue placeholder="12:00 PM" />
                          </SelectCustomUpTrigger>
                          <CustomSelectContent>
                            <div className="flex-c px-4 mb-2 justify-between">
                              <h6 className="text-lg font-semibold text-side-blue">
                                {
                                  timingState.filter((item, i) => ind === i)[0]
                                    .endTime
                                }{" "}
                                PM
                              </h6>
                              <Button variant={"ghost"}>
                                <X />
                              </Button>
                            </div>
                            <Separator className="mb-4" />
                            {time.map((time, i) => (
                              <CustomSelectItem key={i} value={time}>
                                {time} PM
                              </CustomSelectItem>
                            ))}
                          </CustomSelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {watchOnEventType === EVENT_TYPES.MULTIPLE && (
                    <div className="flex items-end mb-[2px]">
                      {ind === 0 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setTimingState([
                              ...timingState,
                              {
                                startDate: new Date(),
                                startTime: "12:00",
                                endDate: new Date(),
                                endTime: "12:00",
                              },
                            ])
                          }
                          className="rounded-full flex-center w-10 h-10 bg-(--color-secondary-green) hover:bg-(--color-secondary-green)/80 text-black"
                        >
                          <Plus strokeWidth={1.5} size={20} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setTimingState(
                              timingState.filter((_, i) => i !== ind)
                            )
                          }
                          className="rounded-full flex-center w-10 h-10 bg-red-200 hover:bg-red-200/80 text-red-500 border-red-500 border-1"
                        >
                          <Minus strokeWidth={1.5} size={20} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="flex w-full justify-end">
          <div className="space-x-8">
            <BackButton />
            <Button
              variant={"normal"}
              className="w-full sm:w-auto"
              form="date-form"
              type="submit"
              size={"normal"}
              disabled={false}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateStep;
