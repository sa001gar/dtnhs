
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, Eye, Search, UserCheck, UserX } from "lucide-react";
import { supabase } from "@/lib/supabase";

type AlumniType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  batch: string;
  location: string;
  education: string;
  profession: string;
  achievements: string[];
  bio: string;
  image: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

const AdminAlumni = () => {
  const [alumni, setAlumni] = useState<AlumniType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniType | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const fetchAlumni = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from("alumni").select("*");
      
      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) throw error;
      
      setAlumni(data as AlumniType[]);
    } catch (error) {
      console.error("Error fetching alumni:", error);
      toast({
        title: "Error fetching alumni",
        description: "There was a problem loading the alumni data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAlumni();
  }, [statusFilter]);
  
  const handleViewAlumni = (alumnus: AlumniType) => {
    setSelectedAlumni(alumnus);
    setIsViewDialogOpen(true);
  };
  
  const handleStatusChange = async (id: string, status: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("alumni")
        .update({ status })
        .eq("id", id);
      
      if (error) throw error;
      
      fetchAlumni();
      
      toast({
        title: `Alumni ${status}`,
        description: `Alumni has been ${status} successfully.`,
      });
    } catch (error) {
      console.error(`Error ${status} alumni:`, error);
      toast({
        title: `Error ${status} alumni`,
        description: "There was a problem updating the alumni status.",
        variant: "destructive",
      });
    }
  };
  
  const filteredAlumni = alumni.filter(
    (alumnus) =>
      alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alumni Management</CardTitle>
          <CardDescription>
            Manage alumni registration requests and approved alumni
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search alumni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-6">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </div>
          ) : filteredAlumni.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No alumni found
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead className="hidden md:table-cell">Profession</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlumni.map((alumnus) => (
                    <TableRow key={alumnus.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={alumnus.image || ""} alt={alumnus.name} />
                            <AvatarFallback>{alumnus.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{alumnus.name}</p>
                            <p className="text-xs text-muted-foreground">{alumnus.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{alumnus.batch}</TableCell>
                      <TableCell className="hidden md:table-cell">{alumnus.profession}</TableCell>
                      <TableCell className="hidden md:table-cell">{alumnus.location}</TableCell>
                      <TableCell>{getStatusBadge(alumnus.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewAlumni(alumnus)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {alumnus.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-100"
                                onClick={() => handleStatusChange(alumnus.id, "approved")}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-100"
                                onClick={() => handleStatusChange(alumnus.id, "rejected")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedAlumni && (
            <>
              <DialogHeader>
                <DialogTitle>Alumni Details</DialogTitle>
                <DialogDescription>
                  Viewing the complete profile of {selectedAlumni.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-3">
                    <AvatarImage src={selectedAlumni.image || ""} alt={selectedAlumni.name} />
                    <AvatarFallback className="text-xl">{selectedAlumni.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-lg font-medium">{selectedAlumni.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{selectedAlumni.batch}</p>
                  {getStatusBadge(selectedAlumni.status)}
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{selectedAlumni.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{selectedAlumni.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{selectedAlumni.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Education</p>
                      <p className="text-sm text-muted-foreground">{selectedAlumni.education}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profession</p>
                      <p className="text-sm text-muted-foreground">{selectedAlumni.profession}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Achievements</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedAlumni.achievements.length > 0 ? (
                        selectedAlumni.achievements.map((achievement, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-100">
                            {achievement}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No achievements listed</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Bio</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedAlumni.bio}</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                {selectedAlumni.status === "pending" && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                      onClick={() => {
                        handleStatusChange(selectedAlumni.id, "rejected");
                        setIsViewDialogOpen(false);
                      }}
                    >
                      <UserX className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        handleStatusChange(selectedAlumni.id, "approved");
                        setIsViewDialogOpen(false);
                      }}
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAlumni;
