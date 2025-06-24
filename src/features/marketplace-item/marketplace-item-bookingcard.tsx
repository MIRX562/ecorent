"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ChevronDownIcon, Clock, Info, Shield, Star } from "lucide-react";
import { useState } from "react";

export default function BookingCard({ itemData }: { itemData: any }) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const handleRentNow = () => {
    // In a real app, this would navigate to a checkout or reservation page
    console.log("Rent now clicked", { startDate, endDate });
    alert("Rental request submitted! The owner will contact you shortly.");
  };
  return (
    <Card className="shadow-none border-none md:shadow-xl">
      <CardHeader>
        <CardTitle>Rent This Item</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">
            ${itemData.price}/{itemData.priceUnit}
          </p>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span className="ml-1 text-sm">
              {itemData.rating} ({itemData.reviewCount} reviews)
            </span>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="justify-between font-normal w-full"
                >
                  {startDate
                    ? startDate.toLocaleDateString("id")
                    : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setStartDate(date);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end-date">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="justify-between font-normal w-full"
                >
                  {endDate ? endDate.toLocaleDateString("id") : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={endDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setEndDate(date);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center justify-between text-sm">
            <span>Rental fee (3 days)</span>
            <span>${itemData.price * 3}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span>Service fee</span>
            <span>${Math.round(itemData.price * 3 * 0.1)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span>Security deposit (refundable)</span>
            <span>${itemData.deposit}</span>
          </div>
          <Separator className="my-3" />
          <div className="flex items-center justify-between font-medium">
            <span>Total</span>
            <span>
              $
              {itemData.price * 3 +
                Math.round(itemData.price * 3 * 0.1) +
                itemData.deposit}
            </span>
          </div>
        </div>
        <Button
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
          onClick={handleRentNow}
        >
          Rent Now
        </Button>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3 w-3" />
          <span>Secure payment & verified owner</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 pt-0">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Usually responds within {itemData.owner.responseTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span>Free cancellation 24 hours before pickup</span>
        </div>
      </CardFooter>
    </Card>
  );
}
