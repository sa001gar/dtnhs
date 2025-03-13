"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout/Layout"
import PageHeader from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import AnimatedSection from "@/components/ui/AnimatedSection"
import PageLoader from "@/components/shared/PageLoader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {routineData} from "@/data/routines.ts"

const Routine = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState("5")
  const [selectedSection, setSelectedSection] = useState("A")
  const [sectionOptions, setSectionOptions] = useState(["A", "B", "C"])
  const [sectionLabel, setSectionLabel] = useState("Section")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Update section options based on selected class
    let newSectionOptions = ["A", "B", "C"]
    let newSectionLabel = "Section"

    if (["9", "10"].includes(selectedClass)) {
      newSectionOptions = ["A", "B"]
      newSectionLabel = "Section"
    } else if (["11", "12"].includes(selectedClass)) {
      newSectionOptions = ["Science", "Commerce", "Arts"]
      newSectionLabel = "Stream"
    }

    setSectionOptions(newSectionOptions)
    setSectionLabel(newSectionLabel)

    // Reset to first option if current selection is invalid
    if (!newSectionOptions.includes(selectedSection)) {
      setSelectedSection(newSectionOptions[0])
    }

    window.scrollTo(0, 0)
    return () => clearTimeout(timer)
  }, [selectedClass, selectedSection])

  // All available class options
  const classOptions = ["5", "6", "7", "8", "9", "10", "11", "12"]

  // Routine data organized by class, section, and day
  // const routineData = 
    

  // Helper function to determine if a class is primary or secondary
  const getLevel = (classNum) => {
    return Number.parseInt(classNum) <= 8 ? "primary" : "secondary"
  }

  // Get routine for the selected class and section
  const getRoutine = (level, classNum, section, day) => {
    try {
      return routineData[level][classNum][section][day] || []
    } catch (error) {
      console.log("No routine found for this selection")
      return []
    }
  }

  const level = getLevel(selectedClass)

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <Layout>
      <PageHeader
        title="Class Routines"
        description="View the weekly class schedules for different grades."
        pattern="grid"
      />

      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="mt-8">
          <AnimatedSection animation="fade-in-up">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-1/2 md:w-1/4">
                <label htmlFor="class-select" className="block text-sm font-medium mb-2">
                  Select Class
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map((classNum) => (
                      <SelectItem key={classNum} value={classNum}>
                        Class {classNum}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-1/2 md:w-1/4">
                <label htmlFor="section-select" className="block text-sm font-medium mb-2">
                  {sectionLabel}
                </label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${sectionLabel}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {sectionOptions.map((section) => (
                      <SelectItem key={section} value={section}>
                        {["11", "12"].includes(selectedClass) ? section : `Section ${section}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Tabs defaultValue="monday" className="w-full">
                <div className="mb-4 w-full h-auto  overflow-x-auto pb-2">
                  <TabsList className="flex flex-nowrap min-w-max">
                    <TabsTrigger value="monday">Monday</TabsTrigger>
                    <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                    <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                    <TabsTrigger value="thursday">Thursday</TabsTrigger>
                    <TabsTrigger value="friday">Friday</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="monday">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">
                        Class {selectedClass} -
                        {["11", "12"].includes(selectedClass) ? selectedSection : `Section ${selectedSection}`} - Monday
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {getRoutine(level, selectedClass, selectedSection, "monday").map((period, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <div className="w-full sm:w-1/4 font-medium">{period.time}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0">{period.subject}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0 text-muted-foreground">
                              {period.teacher && period.teacher}
                            </div>
                          </div>
                        ))}
                        {getRoutine(level, selectedClass, selectedSection, "monday").length === 0 && (
                          <div className="py-4 text-center text-muted-foreground">
                            No routine found for this selection
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tuesday">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">
                        Class {selectedClass} -
                        {["11", "12"].includes(selectedClass) ? selectedSection : `Section ${selectedSection}`} -
                        Tuesday
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {getRoutine(level, selectedClass, selectedSection, "tuesday").map((period, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <div className="w-full sm:w-1/4 font-medium">{period.time}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0">{period.subject}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0 text-muted-foreground">
                              {period.teacher && period.teacher}
                            </div>
                          </div>
                        ))}
                        {getRoutine(level, selectedClass, selectedSection, "tuesday").length === 0 && (
                          <div className="py-4 text-center text-muted-foreground">
                            No routine found for this selection
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="wednesday">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">
                        Class {selectedClass} -
                        {["11", "12"].includes(selectedClass) ? selectedSection : `Section ${selectedSection}`} -
                        Wednesday
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {getRoutine(level, selectedClass, selectedSection, "wednesday").map((period, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <div className="w-full sm:w-1/4 font-medium">{period.time}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0">{period.subject}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0 text-muted-foreground">
                              {period.teacher && period.teacher}
                            </div>
                          </div>
                        ))}
                        {getRoutine(level, selectedClass, selectedSection, "wednesday").length === 0 && (
                          <div className="py-4 text-center text-muted-foreground">
                            No routine found for this selection
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="thursday">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">
                        Class {selectedClass} -
                        {["11", "12"].includes(selectedClass) ? selectedSection : `Section ${selectedSection}`} -
                        Thursday
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {getRoutine(level, selectedClass, selectedSection, "thursday").map((period, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <div className="w-full sm:w-1/4 font-medium">{period.time}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0">{period.subject}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0 text-muted-foreground">
                              {period.teacher && period.teacher}
                            </div>
                          </div>
                        ))}
                        {getRoutine(level, selectedClass, selectedSection, "thursday").length === 0 && (
                          <div className="py-4 text-center text-muted-foreground">
                            No routine found for this selection
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="friday">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">
                        Class {selectedClass} -
                        {["11", "12"].includes(selectedClass) ? selectedSection : `Section ${selectedSection}`} - Friday
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {getRoutine(level, selectedClass, selectedSection, "friday").map((period, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <div className="w-full sm:w-1/4 font-medium">{period.time}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0">{period.subject}</div>
                            <div className="w-full sm:w-1/3 mt-1 sm:mt-0 text-muted-foreground">
                              {period.teacher && period.teacher}
                            </div>
                          </div>
                        ))}
                        {getRoutine(level, selectedClass, selectedSection, "friday").length === 0 && (
                          <div className="py-4 text-center text-muted-foreground">
                            No routine found for this selection
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  )
}

export default Routine

