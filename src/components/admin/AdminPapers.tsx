
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { FileUp, File, FilePlus, Trash2, Download } from "lucide-react";

const AdminPapers = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  
  const papers = [
    { id: 1, subject: "Physics", year: "2023", term: "Final", fileName: "physics_2023_final.pdf" },
    { id: 2, subject: "Mathematics", year: "2023", term: "Final", fileName: "mathematics_2023_final.pdf" },
    { id: 3, subject: "Chemistry", year: "2023", term: "Final", fileName: "chemistry_2023_final.pdf" },
    { id: 4, subject: "Biology", year: "2023", term: "Final", fileName: "biology_2023_final.pdf" },
    { id: 5, subject: "English", year: "2023", term: "Final", fileName: "english_2023_final.pdf" },
    { id: 6, subject: "History", year: "2023", term: "Mid-Term", fileName: "history_2023_midterm.pdf" },
  ];

  const subjects = ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Bengali", "History", "Geography"];
  const years = ["2023", "2022", "2021", "2020", "2019"];
  const terms = ["Final", "Mid-Term", "Unit Test"];

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Paper Uploaded",
        description: `Successfully uploaded ${subject} ${year} ${term} paper.`,
      });
      setSubject("");
      setYear("");
      setTerm("");
    }, 1500);
  };

  const handleDelete = (id) => {
    toast({
      title: "Paper Deleted",
      description: "The paper has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Previous Year Papers Management</h2>
      <p className="text-muted-foreground">Upload and manage previous year question papers for students.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FilePlus className="h-5 w-5 text-school-primary" />
              Upload New Paper
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject} required>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((sub) => (
                      <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={year} onValueChange={setYear} required>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="term">Term</Label>
                  <Select value={term} onValueChange={setTerm} required>
                    <SelectTrigger id="term">
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      {terms.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Paper File (PDF)</Label>
                <Input id="file" type="file" accept=".pdf" required />
              </div>
              
              <Button type="submit" className="w-full" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Paper
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <File className="h-5 w-5 text-school-primary" />
              Uploaded Papers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full pr-4 rounded-md border">
              <div className="p-4">
                {papers.length > 0 ? (
                  <div className="space-y-2">
                    {papers.map((paper) => (
                      <div key={paper.id} className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-muted/50">
                        <div className="flex items-center">
                          <File className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{paper.subject} ({paper.year} {paper.term})</p>
                            <p className="text-xs text-muted-foreground">{paper.fileName}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(paper.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No papers uploaded yet
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPapers;
