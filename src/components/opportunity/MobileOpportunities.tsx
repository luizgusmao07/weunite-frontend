import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CardSuggestionOpportunity from "./CardSuggestionOpportunity";

type Props = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
};

export function MobileOpportunities({ isOpen, onOpenChange }: Props) {
	const items = Array.from({ length: 4 }, (_, i) => i);
	return (
		<Sheet open={isOpen} onOpenChange={onOpenChange}>
			<SheetContent side="bottom" className="h-[70vh]">
				<SheetHeader>
					<SheetTitle>Sugestões de oportunidade</SheetTitle>
				</SheetHeader>
				<div className="mt-4 space-y-4">
					{items.map((i) => (
						<CardSuggestionOpportunity key={i} />
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
}

export default MobileOpportunities;
