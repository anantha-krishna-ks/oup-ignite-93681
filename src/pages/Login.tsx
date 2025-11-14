import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import oxfordIgniteLogo from "@/assets/oxford-ignite-logo.png";

// Predefined credentials
const CREDENTIALS = {
  teacher: { username: "teacher", password: "teacher123" },
  student: { username: "student", password: "student123" },
  parent: { username: "parent", password: "parent123" },
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (
        username === CREDENTIALS.teacher.username &&
        password === CREDENTIALS.teacher.password
      ) {
        localStorage.setItem("userRole", "teacher");
        toast.success("Welcome, Teacher!");
        navigate("/chapters");
      } else if (
        username === CREDENTIALS.student.username &&
        password === CREDENTIALS.student.password
      ) {
        localStorage.setItem("userRole", "student");
        toast.success("Welcome, Student!");
        navigate("/chapters");
      } else if (
        username === CREDENTIALS.parent.username &&
        password === CREDENTIALS.parent.password
      ) {
        localStorage.setItem("userRole", "parent");
        toast.success("Welcome, Parent!");
        navigate("/parent-dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <img src={oxfordIgniteLogo} alt="Oxford Ignite" className="h-20 w-auto" />
          </div>
          <p className="text-muted-foreground">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-semibold text-center mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <p>
                <span className="font-medium">Teacher:</span> teacher / teacher123
              </p>
              <p>
                <span className="font-medium">Student:</span> student / student123
              </p>
              <p>
                <span className="font-medium">Parent:</span> parent / parent123
              </p>
            </div>
          </div>
        </div>

      </Card>
    </div>
  );
};

export default Login;
