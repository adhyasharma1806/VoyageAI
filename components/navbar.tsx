'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plane, Menu, X, User } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/planner', label: 'Plan Trip' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/map', label: 'Map' },
];

export function Navbar() {

  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [mounted, setMounted] = React.useState(false);

  /* Fix hydration issue */

  React.useEffect(() => {

    setMounted(true);

    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setUserName(user.name || "");
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUserName("");

    router.push("/");

  };

  /* Prevent mismatch before mount */

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/20 dark:border-gray-700/20"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <Link href="/" className="flex items-center gap-2 group">

            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg"
            >
              <Plane className="h-5 w-5 text-white" />
            </motion.div>

            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              VoyageAI
            </span>

          </Link>

          {/* Desktop Nav */}

          <div className="hidden md:flex items-center gap-1">

            {navLinks.map((link) => (

              <Link key={link.href} href={link.href}>

                <Button
                  variant="ghost"
                  className={cn(
                    'relative',
                    pathname === link.href &&
                      'text-blue-600 dark:text-blue-400'
                  )}
                >

                  {link.label}

                  {pathname === link.href && (

                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />

                  )}

                </Button>

              </Link>

            ))}

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-2">

            <ThemeToggle />

            {/* Logged Out */}

            {!isLoggedIn && (

              <>
                <Button asChild variant="ghost" className="hidden md:block">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>

                <Button
                  asChild
                  className="hidden md:block bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>

            )}

            {/* Logged In */}

            {isLoggedIn && (

              <div className="flex items-center gap-3">

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white"
                >
                  <User className="h-4 w-4" />
                </motion.div>

                <span className="hidden md:block text-sm font-medium">
                  {userName}
                </span>

                <Button
                  variant="ghost"
                  className="hidden md:block"
                  onClick={handleLogout}
                >
                  Logout
                </Button>

              </div>

            )}

            {/* Mobile Toggle */}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >

              {mobileMenuOpen
                ? <X className="h-5 w-5" />
                : <Menu className="h-5 w-5" />}

            </Button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}

      {mobileMenuOpen && (

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-gray-200/20 dark:border-gray-700/20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl"
        >

          <div className="px-4 py-4 space-y-2">

            {navLinks.map((link) => (

              <Link key={link.href} href={link.href}>

                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start',
                    pathname === link.href &&
                      'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >

                  {link.label}

                </Button>

              </Link>

            ))}

            {/* Mobile Auth */}

            {!isLoggedIn && (

              <>

                <Button asChild variant="ghost" className="w-full justify-start">

                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileMenuOpen(false)}
                  >

                    Sign In

                  </Link>

                </Button>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                >

                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >

                    Sign Up

                  </Link>

                </Button>

              </>

            )}

            {isLoggedIn && (

              <>
                <div className="px-4 py-2 text-sm font-medium">
                  {userName}
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>

            )}

          </div>

        </motion.div>

      )}

    </motion.nav>
  );
}