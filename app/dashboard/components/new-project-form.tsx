"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { createProject } from "@/lib/dao/TaskDAOAlt"
import { ColorPicker } from "@/components/color-picker"


const newProjectFormSchema = z.object({
  name: z.string().min(2, { message: "Project name must be at least 2 characters." }), 
  description: z.string().min(2, { message: "Description must be at least 2 characters." }), 
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  color_code: z.string().optional(),
  status: z.enum(["Planning", "Execution", "Closed"]).default("Planning"),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
  owner: z.string().uuid({ message: "Invalid project" }),
})

export function NewProjectForm({onSave}) {
  // ...

  // 1. Define your form.
  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      //project_id: '7f04e41f-87a8-4561-8fa8-01de820931aa',
      owner: '7b782ab7-ca01-47c8-8232-948e65d90ea0',
      name: "",
      description: "",
      status: "Planning",
      priority: "Medium", 
      color_code: "#d3d3d3",     
    },
  })
 
  /*

  due_date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      if (!isNaN(date.getTime())) return date;
    }
    return undefined;
  }, z.date({ message: "Due date must be a valid date." })),


  assigned_to: z.string(),


})

  */
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof newProjectFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    //const today = new Date();
    // const project_id = '7f04e41f-87a8-4561-8fa8-01de820931aa';
    // const user_id = '7b782ab7-ca01-47c8-8232-948e65d90ea0';
    // console.log(project_id)
    console.log(values)
    //createTask(values.title, values.description, values.status, values.due_date, values.project_id, values.priority, "", values.user_id, '7b782ab7-ca01-47c8-8232-948e65d90ea0'); 
    createProject(values.name, values.description, values.status, values.priority, values.color_code, values.owner, values.start_date, values.end_date)
    console.log("Created new project ")
    onSave()
    
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              {/* <FormDescription>
                Enter a description for the Task
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Execution">Execution</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
              control={form.control}
              name="color_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Color</FormLabel>
                  <FormControl>
                    <ColorPicker value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
                  </FormControl>
                  {/* <FormDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: field.value }} />
                      <span className="text-sm">Selected color: {field.value}</span>
                    </div>
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />    

    <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Owner</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

    <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date >= new Date() || date < new Date("2035-01-01")
                    // }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date >= new Date() || date < new Date("2035-01-01")
                    // }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
