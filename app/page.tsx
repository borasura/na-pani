import Image from "next/image"
import Link from "next/link"
import { BenefitsCarousel } from "@/components/benefits-carousel"
import { Button } from "@/components/ui/button"
import NavbarMini from "@/components/navbar-mini"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10 p-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl">NaPani</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Overview
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Product
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Solutions
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Docs
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Get Started
              </Link>
              <NavbarMini />
              {/* <Button>Get Started</Button> */}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Project Management Made Simple
                  </h1>
                  <br />
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    NaPani helps teams organize, track, and manage their work in one collaborative space. Streamline
                    your workflow and boost productivity.
                  </p>
                  <br />
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Get Things Done Without the Overcomplication
                  </p>

                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                    Start for free
                  </Button>
                  <Button size="lg" variant="outline">
                    Book a demo
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[1000px] rounded-lg border bg-background p-2 shadow-lg">
                <Image
                  src="/ProjectView.png"
                  width={1600}
                  height={800}
                  alt="TaskFlow Dashboard"
                  className="aspect-[2/1] rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why teams choose NaPani</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover how NaPani transforms the way teams work together
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 max-w-4xl">
              <BenefitsCarousel />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Ready to transform your workflow?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join thousands of teams that use NaPani to streamline their projects and boost productivity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                    Get started for free
                  </Button>
                  <Button size="lg" variant="outline">
                    Contact sales
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4">
                    <div className="text-4xl font-bold text-blue-500">99%</div>
                    <p className="text-center text-sm">Improved team collaboration</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4">
                    <div className="text-4xl font-bold text-purple-500">3x</div>
                    <p className="text-center text-sm">Faster project delivery</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4">
                    <div className="text-4xl font-bold text-green-500">50%</div>
                    <p className="text-center text-sm">Reduction in meetings</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4">
                    <div className="text-4xl font-bold text-yellow-500">10k+</div>
                    <p className="text-center text-sm">Happy teams</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <br />
            <p className=" text-muted-foreground md:text-xl">
                    OK, it's a joke. NaPani is just a Project Management software. Don't expect miracles. This app won't fix your team's drama. It'll just document it. Use wisely (or don't!).
                  </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} NaPani Inc. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

