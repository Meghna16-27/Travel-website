import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "../lib/utils"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef(function Carousel(
  { orientation = "horizontal", opts, plugins, className, children, ...props },
  ref
) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins)

  return (
    <CarouselContext.Provider value={{ carouselRef, api, orientation }}>
      <div ref={ref} className={cn("position-relative relative", className)} role="region" aria-roledescription="carousel" {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(function CarouselContent({ className, ...props }, ref) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden w-100">
      {/* Added style display flex and flex-direction fallback directly to bypass framework conflicts */}
      <div 
        ref={ref} 
        className={cn(className)} 
        style={{
          display: 'flex',
          flexDirection: orientation === "horizontal" ? "row" : "column",
          marginLeft: orientation === "horizontal" ? "-16px" : "0px",
          marginTop: orientation === "horizontal" ? "0px" : "-16px",
        }}
        {...props} 
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(function CarouselItem({ className, ...props }, ref) {
  const { orientation } = useCarousel()

  return (
    <div 
      ref={ref} 
      role="group" 
      aria-roledescription="item" 
      className={cn(className)} 
      style={{
        flexShrink: 0,
        flexGrow: 0,
        minWidth: 0,
        paddingLeft: orientation === "horizontal" ? "16px" : "0px",
        paddingTop: orientation === "horizontal" ? "16px" : "0px",
      }}
      {...props} 
    />
  )
})
CarouselItem.displayName = "CarouselItem"

export { Carousel, CarouselContent, CarouselItem }