import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertDonationSchema, type InsertDonation } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PRESET_AMOUNTS = [
  { amount: 5, link: "#donate-5" },
  { amount: 10, link: "#donate-10" },
  { amount: 20, link: "#donate-20" },
  { amount: 50, link: "#donate-50" },
  { amount: 100, link: "#donate-100" },
  { amount: "Custom", link: "#donate-custom" },
];

export default function Donate() {
  const { toast } = useToast();

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Support Our Cause</h1>

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Donation Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {PRESET_AMOUNTS.map(({ amount, link }) => (
              <a 
                key={amount} 
                href={link}
                className="no-underline"
              >
                <Button 
                  variant="outline" 
                  className="w-full h-16 text-lg"
                >
                  {typeof amount === 'number' ? `$${amount}` : amount}
                </Button>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Your donation will help fund conservation efforts, protect endangered species,
          and support educational programs.
        </p>
      </div>
    </div>
  );
}