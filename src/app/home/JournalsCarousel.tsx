"use client"
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { loadJournals } from "@/services/loadJournals";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";

interface JournalsCarouselProps {
  onJournalClick: (journal: any) => void;
  openModal: () => void;
}

const JournalsCarousel: React.FC<JournalsCarouselProps> = ({ onJournalClick, openModal }) => {
  const [journals, setJournals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const owner = localStorage.getItem("id");
        const loadedJournals = await loadJournals(owner);
        console.log("Loaded Journals:", loadedJournals);
        setJournals(loadedJournals);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading journals:", error);
        setIsLoading(false);
      }
    };
      fetchJournals();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : journals?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-2xl font-bold tracking-tight">
            You have not yet created a journal.
          </h3>
          <Button onClick={openModal} className="mt-4">
            Add Journal
          </Button>
        </div>
      ) : (
        <div>
        <Label className="my-16 text-3xl font-bold">
            List of Journals
        </Label>    
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="horizontal"
          className="w-full max-w-xs"
        >
          <CarouselContent>
            {journals?.map((journal: any) => (
              <CarouselItem key={journal._id} className="pt-1">
                <div onClick={() => onJournalClick(journal._id)} className="p-1">
                  <Card>
                    <CardContent className="items-center justify-center p-6">
                      <p className="text-2xl font-semibold">
                        {journal.name}
                      </p>
                      <p className="text-lg font-regular">
                      Created {format(new Date(journal.date_created), 'MM/dd/yyyy')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Button onClick={openModal} className="mt-4">
            Add Journal
          </Button>
        </div>
      )}
    </>
  );
};

export default JournalsCarousel;
