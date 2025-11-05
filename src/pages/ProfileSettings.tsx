import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Mail, Phone, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!userRole) {
      navigate("/");
    }
  }, [userRole, navigate]);
  
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: userRole === "teacher" ? "sarah.johnson@school.edu" : "student@school.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Education Street, Learning City, LC 12345",
    securityQuestion: "What is your library card number?",
    securityAnswer: "1234",
  });

  const [enableFeedback, setEnableFeedback] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <Layout role={userRole as "student" | "teacher" | "parent"}>
      <div className="container max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Profile Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account information</p>
        </div>
        {/* Profile Picture Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {formData.firstName[0]}{formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                variant="secondary"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Click the camera icon to upload a new profile picture
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="securityQuestion">
                  Select Security Question <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.securityQuestion}
                  onValueChange={(value) =>
                    setFormData({ ...formData, securityQuestion: value })
                  }
                >
                  <SelectTrigger id="securityQuestion">
                    <SelectValue placeholder="Select a question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="What is your library card number?">
                      What is your library card number?
                    </SelectItem>
                    <SelectItem value="What is your mother's maiden name?">
                      What is your mother's maiden name?
                    </SelectItem>
                    <SelectItem value="What was the name of your first pet?">
                      What was the name of your first pet?
                    </SelectItem>
                    <SelectItem value="What city were you born in?">
                      What city were you born in?
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityAnswer">
                  Security Answer <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="securityAnswer"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  onChange={handleInputChange}
                  placeholder="Enter your answer"
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Fields marked with '<span className="text-destructive">*</span>' are mandatory
            </p>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableFeedback"
                checked={enableFeedback}
                onCheckedChange={(checked) => setEnableFeedback(checked as boolean)}
              />
              <Label
                htmlFor="enableFeedback"
                className="text-sm font-normal cursor-pointer"
              >
                Enable Post Session Feedback
              </Label>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
