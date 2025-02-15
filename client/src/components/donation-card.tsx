import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DonationOption {
  amount: number;
  description: string;
  icon: string;
}

export default function DonationCard({ 
  option,
  onSelect
}: { 
  option: DonationOption;
  onSelect: (amount: number) => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-4xl">{option.icon}</span>
            <span>${option.amount}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">{option.description}</p>
          <Button 
            className="w-full" 
            onClick={() => onSelect(option.amount)}
          >
            Select
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
