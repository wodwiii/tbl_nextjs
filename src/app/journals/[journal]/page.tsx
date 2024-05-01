"use client";
import Link from "next/link";
import {
  CircleUser,
  Home,
  Menu,
  NotebookText,
  Newspaper,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { JournalTable } from "./JournalContent";
import { useEffect, useState } from "react";
import { loadJournals } from "@/services/loadJournals";
import { useRouter } from "next/navigation";
import logo from "../../../../public/logo.png";
import Image from "next/image";
interface Entry {
  _id: string;
  Date: string;
  Description: string;
  Account_title: string;
  Debit_Amount: number;
  Credit_Amount: number;
}

interface Journal {
  name: string;
  _id: string;
  entries: Entry[];
}

const Journal = ({ params }: any) => {
  const journalId = params.journal;
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const owner = localStorage.getItem("id");
        const loadedJournals = await loadJournals(owner);
        console.log(
          "Loaded Journal:",
          loadedJournals.filter(
            (item: { _id: any }) => item._id === journalId
          )[0]
        );
        setSelectedJournal(
          loadedJournals.filter(
            (item: { _id: any }) => item._id === journalId
          )[0]
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading journals:", error);
      }
    };
    fetchJournals();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("id");
    router.push("/");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-slate-300">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="w-12 rounded ">
                <Image src={logo} alt={""} />
              </div>
              <span className="">Journal & Trial Balance</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 ml-4">
              <Link
                href="/home"
                className="flex mt-6 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/ledgers"
                className="flex mt-2 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <NotebookText className="h-4 w-4" />
                Trial Balance
              </Link>
              <Link
                href="#"
                className="flex mt-2 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Info className="h-4 w-4" />
                About
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <span className="sr-only">Trial-Balance Ledger</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <NotebookText className="h-5 w-5" />
                  Trial Balance
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Info className="h-5 w-5" />
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="absolute right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gradient-to-l from-slate-200 via-slate-50 to-slate-200">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Journal</h1>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            // Render JournalTable only when data is fetched
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="items-center gap-1 text-center">
                <JournalTable journal={selectedJournal} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Journal;
