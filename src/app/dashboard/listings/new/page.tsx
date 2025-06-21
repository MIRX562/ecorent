"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Trash2, Upload, X, Info, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Categories for the select dropdown
const categories = [
  { value: "outdoor", label: "Outdoor Gear" },
  { value: "electronics", label: "Electronics" },
  { value: "tools", label: "Tools" },
  { value: "sports", label: "Sports Equipment" },
  { value: "party", label: "Party & Events" },
  { value: "vehicles", label: "Vehicles" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home & Garden" },
]

// Condition options for the select dropdown
const conditions = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
]

// Pricing units for the select dropdown
const pricingUnits = [
  { value: "hour", label: "Per Hour" },
  { value: "day", label: "Per Day" },
  { value: "week", label: "Per Week" },
  { value: "month", label: "Per Month" },
]

// Form schema using zod
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(100),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }).max(1000),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  pricingUnit: z.string(),
  deposit: z.coerce.number().nonnegative({ message: "Deposit must be a non-negative number" }),
  category: z.string(),
  condition: z.string(),
  location: z.string().min(3, { message: "Location is required" }),
  features: z.array(z.string()).optional(),
  rules: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  isInstantBook: z.boolean().default(false),
})

export default function NewListingPage() {
  const router = useRouter()
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [rules, setRules] = useState<string[]>([])
  const [newRule, setNewRule] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      pricingUnit: "day",
      deposit: 0,
      category: "",
      condition: "",
      location: "",
      features: [],
      rules: [],
      isActive: true,
      isInstantBook: false,
    },
  })

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  // Add feature
  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  // Remove feature
  const removeFeature = (index: number) => {
    setFeatures((prev) => {
      const newFeatures = [...prev]
      newFeatures.splice(index, 1)
      return newFeatures
    })
  }

  // Add rule
  const addRule = () => {
    if (newRule.trim() && !rules.includes(newRule.trim())) {
      setRules([...rules, newRule.trim()])
      setNewRule("")
    }
  }

  // Remove rule
  const removeRule = (index: number) => {
    setRules((prev) => {
      const newRules = [...prev]
      newRules.splice(index, 1)
      return newRules
    })
  }

  // Form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Include features and rules in the form data
      values.features = features
      values.rules = rules

      // In a real app, you would upload images and submit the form data to your API
      console.log("Form values:", values)
      console.log("Images:", images)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitSuccess(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/dashboard/listings")
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("Failed to create listing. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create New Listing</h1>
      </div>

      {submitSuccess ? (
        <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
          <AlertDescription className="text-green-800 dark:text-green-300">
            Listing created successfully! Redirecting to listings page...
          </AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="details">Details & Features</TabsTrigger>
                <TabsTrigger value="photos">Photos & Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Listing Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Mountain Bike - Trek 21-Speed" {...field} />
                            </FormControl>
                            <FormDescription>A clear, descriptive title helps your item get found.</FormDescription>
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
                              <Textarea
                                placeholder="Describe your item in detail, including condition, features, and any other relevant information."
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Be detailed about the condition, features, and any included accessories.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                      {category.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>Choose the most relevant category for your item.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Condition</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {conditions.map((condition) => (
                                    <SelectItem key={condition.value} value={condition.value}>
                                      {condition.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>Be honest about the condition of your item.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Portland, OR" {...field} />
                            </FormControl>
                            <FormDescription>Enter the city and state where the item is located.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="button" onClick={() => document.getElementById("details-tab")?.click()}>
                    Next: Details & Features
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6">
                      <div className="grid gap-6 sm:grid-cols-3">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                  <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="pl-7"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pricingUnit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pricing Unit</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {pricingUnits.map((unit) => (
                                    <SelectItem key={unit.value} value={unit.value}>
                                      {unit.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="deposit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Security Deposit</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                  <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="pl-7"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormDescription>Optional refundable deposit.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Features</h3>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a feature (e.g., Includes bike lock)"
                              value={newFeature}
                              onChange={(e) => setNewFeature(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  addFeature()
                                }
                              }}
                            />
                            <Button type="button" onClick={addFeature}>
                              Add
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {features.map((feature, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-1 py-1.5 pl-3 pr-2"
                              >
                                {feature}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 rounded-full"
                                  onClick={() => removeFeature(index)}
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </Badge>
                            ))}
                            {features.length === 0 && (
                              <p className="text-sm text-muted-foreground">
                                No features added yet. Features help renters understand what's included.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Rental Rules</h3>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a rule (e.g., Return in clean condition)"
                              value={newRule}
                              onChange={(e) => setNewRule(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  addRule()
                                }
                              }}
                            />
                            <Button type="button" onClick={addRule}>
                              Add
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {rules.map((rule, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-1 py-1.5 pl-3 pr-2"
                              >
                                {rule}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 rounded-full"
                                  onClick={() => removeRule(index)}
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </Badge>
                            ))}
                            {rules.length === 0 && (
                              <p className="text-sm text-muted-foreground">
                                No rules added yet. Clear rules help set expectations for renters.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => document.getElementById("basic-tab")?.click()}>
                    Back: Basic Information
                  </Button>
                  <Button type="button" onClick={() => document.getElementById("photos-tab")?.click()}>
                    Next: Photos & Availability
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="photos" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Photos</h3>
                        <div className="space-y-4">
                          <div className="grid gap-4">
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                  <p className="mb-1 text-sm text-muted-foreground">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB per image)</p>
                                </div>
                                <input
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={handleImageUpload}
                                />
                              </label>
                            </div>

                            {images.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                  <div key={index} className="relative group">
                                    <div className="relative aspect-square overflow-hidden rounded-lg border">
                                      <Image
                                        src={image.preview || "/placeholder.svg"}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="icon"
                                      className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={() => removeImage(index)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                      <span className="sr-only">Remove image</span>
                                    </Button>
                                    {index === 0 && (
                                      <Badge className="absolute bottom-1 left-1 bg-black/50 hover:bg-black/60">
                                        Cover Photo
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {images.length === 0 && (
                              <div className="flex items-center p-4 text-sm text-amber-800 border border-amber-300 rounded-lg bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300">
                                <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                                <div>
                                  <p>
                                    Adding high-quality photos significantly increases your chances of renting out your
                                    item. We recommend at least 3-5 photos from different angles.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Availability</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Listing Status</FormLabel>
                                      <FormDescription>Make your listing visible to potential renters</FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormField
                                control={form.control}
                                name="isInstantBook"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Instant Book</FormLabel>
                                      <FormDescription>Allow renters to book without prior approval</FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="w-full">
                                <Calendar className="mr-2 h-4 w-4" />
                                Set Unavailable Dates
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Set Unavailable Dates</DialogTitle>
                                <DialogDescription>
                                  Mark dates when your item is not available for rent.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="flex items-center justify-center p-4 text-sm text-muted-foreground border rounded-lg bg-muted/50">
                                  <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                  <p>Calendar functionality would be implemented here.</p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="button">Save Dates</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("details-tab")?.click()}
                  >
                    Back: Details & Features
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Listing..." : "Create Listing"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {submitError && (
              <Alert variant="destructive">
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      )}
    </div>
  )
}
