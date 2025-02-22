import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import {
  Home,
  BookOpen,
  Network,
  Brain,
  Cog,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SidebarProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage = "home",
  onNavigate = () => {},
}: SidebarProps) => {
  const navigationItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "software", label: "Software Engineering", icon: Cog },
    { id: "network", label: "Network Engineering", icon: Network },
    { id: "ai", label: "AI Engineering", icon: Brain },
    { id: "general", label: "General Engineering", icon: BookOpen },
  ];

  const bottomItems = [
    { id: "admin", label: "Admin Dashboard", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold">ExamPrep</h2>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePage === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onNavigate(item.id)}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t space-y-2">
        {bottomItems.map((item) => (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start mb-2"
                  onClick={() => onNavigate(item.id)}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
