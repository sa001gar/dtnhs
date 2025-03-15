
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, Clock, Plus, Pencil, Trash2 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const examTypeSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  label: z.string().min(1, { message: "Label is required" }),
});

const examClassSchema = z.object({
  class: z.string().min(1, { message: "Class name is required" }),
  dates: z.string().min(1, { message: "Date range is required" }),
});

const examDetailSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  day: z.string().min(1, { message: "Day is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  time: z.string().min(1, { message: "Time is required" }),
});

const formSchema = z.object({
  examType: z.string().min(1, { message: "Exam type is required" }),
  class: z.string().min(1, { message: "Class is required" }),
  dates: z.string().min(1, { message: "Date range is required" }),
  examDetails: z.array(examDetailSchema).min(1, { message: "At least one exam detail is required" }),
});

type ExamType = {
  id: string;
  label: string;
};

type ExamDetail = {
  date: string;
  day: string;
  subject: string;
  time: string;
};

type ExamClass = {
  class: string;
  dates: string;
  examDetails: ExamDetail[];
};

type ExamSchedule = {
  [key: string]: ExamClass[];
};

const initialExamTypes: ExamType[] = [
  { id: "mid-term", label: "Mid-Term Exams" },
  { id: "final", label: "Final Exams" },
  { id: "unit-tests", label: "Unit Tests" },
  { id: "board-exams", label: "Board Exams" },
];

const initialSchedules: ExamSchedule = {
  "mid-term": [
    {
      class: "Classes V-VIII",
      dates: "August 10-20, 2023",
      examDetails: [
        { date: "August 10, 2023", day: "Monday", subject: "English", time: "10:00 AM - 12:00 PM" },
        { date: "August 11, 2023", day: "Tuesday", subject: "Bengali/Hindi", time: "10:00 AM - 12:00 PM" },
      ]
    },
  ],
  "final": [
    {
      class: "Classes V-VIII",
      dates: "February 15-25, 2024",
      examDetails: [
        { date: "February 15, 2024", day: "Monday", subject: "English", time: "10:00 AM - 12:00 PM" },
        { date: "February 16, 2024", day: "Tuesday", subject: "Bengali/Hindi", time: "10:00 AM - 12:00 PM" },
      ]
    },
  ],
};

const AdminExams = () => {
  const { toast } = useToast();
  const [examTypes, setExamTypes] = useState<ExamType[]>(initialExamTypes);
  const [schedules, setSchedules] = useState<ExamSchedule>(initialSchedules);
  const [activeTab, setActiveTab] = useState<string>("exam-schedules");
  const [selectedExamType, setSelectedExamType] = useState<string>("mid-term");
  const [isAddingExamType, setIsAddingExamType] = useState(false);
  const [isAddingExamSchedule, setIsAddingExamSchedule] = useState(false);
  const [examDetailsCount, setExamDetailsCount] = useState(1);
  const [editingExamClass, setEditingExamClass] = useState<ExamClass | null>(null);

  const examTypeForm = useForm<z.infer<typeof examTypeSchema>>({
    resolver: zodResolver(examTypeSchema),
    defaultValues: {
      id: "",
      label: "",
    },
  });

  const examScheduleForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examType: selectedExamType,
      class: "",
      dates: "",
      examDetails: [{ date: "", day: "", subject: "", time: "" }],
    },
  });

  const handleAddExamType = (data: z.infer<typeof examTypeSchema>) => {
    // Check if ID already exists
    if (examTypes.some(type => type.id === data.id)) {
      toast({
        title: "Error",
        description: "An exam type with this ID already exists.",
        variant: "destructive",
      });
      return;
    }

    // Fixed: Ensure we're adding data with required properties
    const newExamType: ExamType = {
      id: data.id,
      label: data.label,
    };

    setExamTypes([...examTypes, newExamType]);
    setSchedules({ ...schedules, [data.id]: [] });
    examTypeForm.reset();
    setIsAddingExamType(false);
    toast({
      title: "Success",
      description: "New exam type added successfully.",
    });
  };

  const handleDeleteExamType = (id: string) => {
    setExamTypes(examTypes.filter(type => type.id !== id));
    const { [id]: _, ...restSchedules } = schedules;
    setSchedules(restSchedules);
    toast({
      title: "Success",
      description: "Exam type deleted successfully.",
    });
  };

  const handleAddExamSchedule = (data: z.infer<typeof formSchema>) => {
    const examType = data.examType;
    
    // Fixed: Ensure all required properties are set in examDetails
    const examDetails: ExamDetail[] = data.examDetails.map(detail => ({
      date: detail.date,
      day: detail.day,
      subject: detail.subject,
      time: detail.time,
    }));
    
    const newExamClass: ExamClass = {
      class: data.class,
      dates: data.dates,
      examDetails: examDetails,
    };

    if (editingExamClass) {
      // Update existing exam class
      const updatedSchedules = { ...schedules };
      updatedSchedules[examType] = updatedSchedules[examType].map(ec => 
        ec.class === editingExamClass.class ? newExamClass : ec
      );
      setSchedules(updatedSchedules);
      toast({
        title: "Success",
        description: "Exam schedule updated successfully.",
      });
    } else {
      // Add new exam class
      const updatedSchedules = { ...schedules };
      updatedSchedules[examType] = [...(updatedSchedules[examType] || []), newExamClass];
      setSchedules(updatedSchedules);
      toast({
        title: "Success",
        description: "New exam schedule added successfully.",
      });
    }

    examScheduleForm.reset();
    setExamDetailsCount(1);
    setIsAddingExamSchedule(false);
    setEditingExamClass(null);
  };

  const handleDeleteExamSchedule = (examType: string, className: string) => {
    const updatedSchedules = { ...schedules };
    updatedSchedules[examType] = updatedSchedules[examType].filter(
      ec => ec.class !== className
    );
    setSchedules(updatedSchedules);
    toast({
      title: "Success",
      description: "Exam schedule deleted successfully.",
    });
  };

  const handleEditExamSchedule = (examType: string, examClass: ExamClass) => {
    setEditingExamClass(examClass);
    setSelectedExamType(examType);
    examScheduleForm.reset({
      examType,
      class: examClass.class,
      dates: examClass.dates,
      examDetails: examClass.examDetails,
    });
    setExamDetailsCount(examClass.examDetails.length);
    setIsAddingExamSchedule(true);
  };

  const addExamDetail = () => {
    const currentExamDetails = examScheduleForm.getValues("examDetails") || [];
    examScheduleForm.setValue("examDetails", [
      ...currentExamDetails,
      { date: "", day: "", subject: "", time: "" },
    ]);
    setExamDetailsCount(examDetailsCount + 1);
  };

  const removeExamDetail = (index: number) => {
    const currentExamDetails = examScheduleForm.getValues("examDetails");
    if (currentExamDetails.length > 1) {
      examScheduleForm.setValue(
        "examDetails",
        currentExamDetails.filter((_, i) => i !== index)
      );
      setExamDetailsCount(examDetailsCount - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Exam Schedules</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="exam-schedules">Exam Schedules</TabsTrigger>
          <TabsTrigger value="exam-types">Exam Types</TabsTrigger>
        </TabsList>

        <TabsContent value="exam-types" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Exam Types</h3>
            <Button onClick={() => setIsAddingExamType(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Exam Type
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {examTypes.map((type) => (
              <Card key={type.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{type.label}</CardTitle>
                  <CardDescription>ID: {type.id}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    {schedules[type.id]?.length || 0} class schedules
                  </p>
                </CardContent>
                <CardContent className="pt-0 flex justify-end gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Exam Type</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this exam type? All associated schedules will also be deleted. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteExamType(type.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={isAddingExamType} onOpenChange={setIsAddingExamType}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Exam Type</DialogTitle>
                <DialogDescription>
                  Create a new exam type for organizing exam schedules.
                </DialogDescription>
              </DialogHeader>
              <Form {...examTypeForm}>
                <form onSubmit={examTypeForm.handleSubmit(handleAddExamType)} className="space-y-4">
                  <FormField
                    control={examTypeForm.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID (used for system identification)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., mid-term, final, unit-test" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={examTypeForm.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label (displayed to users)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Mid-Term Exams, Final Exams" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Save Exam Type</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="exam-schedules" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Exam Schedules</h3>
              <p className="text-sm text-muted-foreground">
                Manage exam schedules for different classes and exam types
              </p>
            </div>
            <Button onClick={() => {
              examScheduleForm.reset({
                examType: selectedExamType,
                class: "",
                dates: "",
                examDetails: [{ date: "", day: "", subject: "", time: "" }]
              });
              setExamDetailsCount(1);
              setEditingExamClass(null);
              setIsAddingExamSchedule(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Exam Schedule
            </Button>
          </div>

          <div className="space-y-4">
            <Select value={selectedExamType} onValueChange={setSelectedExamType}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {schedules[selectedExamType]?.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">No exam schedules found for this exam type</p>
                    <Button onClick={() => {
                      examScheduleForm.reset({
                        examType: selectedExamType,
                        class: "",
                        dates: "",
                        examDetails: [{ date: "", day: "", subject: "", time: "" }]
                      });
                      setExamDetailsCount(1);
                      setEditingExamClass(null);
                      setIsAddingExamSchedule(true);
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              schedules[selectedExamType]?.map((examClass, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{examClass.class}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          {examClass.dates}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditExamSchedule(selectedExamType, examClass)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Exam Schedule</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this exam schedule? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteExamSchedule(selectedExamType, examClass.class)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Day</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Subject</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {examClass.examDetails.map((detail, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="px-4 py-3 text-sm">{detail.date}</td>
                              <td className="px-4 py-3 text-sm">{detail.day}</td>
                              <td className="px-4 py-3 text-sm font-medium">{detail.subject}</td>
                              <td className="px-4 py-3 text-sm flex items-center">
                                <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
                                {detail.time}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <Dialog open={isAddingExamSchedule} onOpenChange={setIsAddingExamSchedule}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingExamClass ? "Edit Exam Schedule" : "Add New Exam Schedule"}
                </DialogTitle>
                <DialogDescription>
                  {editingExamClass
                    ? "Update the exam schedule details."
                    : "Fill in the details for the new exam schedule."}
                </DialogDescription>
              </DialogHeader>
              <Form {...examScheduleForm}>
                <form
                  onSubmit={examScheduleForm.handleSubmit(handleAddExamSchedule)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={examScheduleForm.control}
                      name="examType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exam Type</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={editingExamClass !== null}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select exam type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {examTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={examScheduleForm.control}
                      name="class"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Classes V-VIII"
                              {...field}
                              disabled={editingExamClass !== null}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={examScheduleForm.control}
                    name="dates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Range</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., August 10-20, 2023"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Exam Details</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addExamDetail}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Exam
                      </Button>
                    </div>

                    {Array.from({ length: examDetailsCount }).map((_, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-md">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-medium">Exam {index + 1}</h5>
                          {examDetailsCount > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExamDetail(index)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={examScheduleForm.control}
                            name={`examDetails.${index}.date`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., August 10, 2023" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={examScheduleForm.control}
                            name={`examDetails.${index}.day`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Day</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Monday" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={examScheduleForm.control}
                            name={`examDetails.${index}.subject`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Mathematics" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={examScheduleForm.control}
                            name={`examDetails.${index}.time`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 10:00 AM - 12:00 PM" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <DialogFooter>
                    <Button type="submit">
                      {editingExamClass ? "Update Schedule" : "Save Schedule"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminExams;
