
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
 
export function DraggableCardDemo() {
  const items = [
    {
      title: "AI Events Organizer",
      image:
        "https://i.ytimg.com/vi/fRL1Z_cqZfA/maxresdefault.jpg",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
      languages : ["React", "Node.js", "MongoDB"],
    },
     
    
    {
      title: "AI Mock Interview Platform",
      image:
        "https://www.thecrazyprogrammer.com/wp-content/uploads/2024/03/Skillora.ai_-1024x539.jpg",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
      languages : ["React", "Node.js", "MongoDB"],
      
    },
    {
      title: "Vehicle Booking Website",
      image:
        "https://img.freepik.com/free-vector/flat-coworking-space-app-template_52683-111681.jpg?semt=ais_incoming&w=740&q=80",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
      languages : ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Patient Management System",
      image:
        "data:image/jpeg;base64,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",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
      languages : ["React", "Node.js", "MongoDB"],
    },
    {
      title: "fake 1",
      image:
        "https://i.ytimg.com/vi/fRL1Z_cqZfA/maxresdefault.jpg",
      className: "absolute top-20 left-[35%] rotate-[-2deg]",
      languages : ["React", "Node.js", "MongoDB"],
    },
     
    
    {
      title: "fake 2",
      image:
        "https://www.thecrazyprogrammer.com/wp-content/uploads/2024/03/Skillora.ai_-1024x539.jpg",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
      languages : ["React", "Node.js", "MongoDB"],
      
    },
    {
      title: "fake 3",
      image:
        "https://img.freepik.com/free-vector/flat-coworking-space-app-template_52683-111681.jpg?semt=ais_incoming&w=740&q=80",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
      languages : ["React", "Node.js", "MongoDB"],
    },
    {
      title: "fake 4",
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEBAPEBAPEBAVEBYVFw8QFRYQFQ8QFxUXGBgWFRUYHSkgGBolGxcVITEiJSkrLi4vGB8zODMsNygtLisBCgoKDg0OGxAQGy0lHyUrKy0rLS0tKy8tKy0tLSsvLS01LSstLS0tLS0tLS0rLS0tKzUtLTAtLS0tLS0tLS0tLf/AABEIAJ8BPgMBIgACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAAAQIDBAUGB//EAFAQAAEDAgMDBQsGCwUIAwAAAAEAAgMEEQUSIQYTMSJBUWFxBxQWMlOBkZKT0eIjQlKhsdIVFzVUY3KCorK0wTRis8LwJTNDc3R1g5QkVWT/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQMEAgX/xAAwEQEAAgIBAwMBBAsBAAAAAAAAAQIDERIhMVEUQbFhBBOh8CIjMlJxcoGRwdHhQv/aAAwDAQACEQMRAD8A9mREVyBERAREQEREBERAREQEREBERAREQEREBERARFF0EpdRdUlAllDRf/RWtkeXG5VU8uY9XMraupXXVlyX5T0ERF2qEUKbIIRSFNlApUgKbKQLkAcUSpshWW2G5sWgdYcCQey6GG1hlDusuAJPULrjnDvhLFQKXNIJBULtw2yIiztwiIgIiICIiAiIgIiICIiAiIgIii6CUVN0QVXUXUIgIpRBCsVclhbp+xZC1077uJ9C6pG5V5bahasllt6WjDRcgF3XzdiuvjadC0KZzRtXGGZho7IFnT0Fr2d5jp9awiFZW0W7K7UmvcCIilyghSiICBEQXTOeht/pW1UNmOmjSRwJFyFbRRxhPKfKSb6qERShtkRFnbhERAREQEREBERAREugIouoQTdCVCICIpQQilEBERARFU02NyoEPYbGw1stW4Fp1FiOlbd9S0c9lj1dSy2ga9dUtPhXenL3WhiDuhQMQPQFosfxyKii3suYgus1jbZnH7Bpzrl/xnU/kJvWarOFVcXyT2d/U1Bf1K1dcJ+M+n8hL6zU/GfT+Ql9ZqmJrCLRe3d3aLjKzuhRQlgfBIC+Jkjcskb/AJN4u0nKdD1HVY/4zqfyEvrNU8oc/d28O0qKkM61Y/CI6FqKXFm1kLKhjXMa7MA11ieS4t5uxZVJu7/Kby9xbJb67rTFK8dsVr258Wa7ELaFpB6DoqoMQa54ZwJGnXbmWPjBj3suXe7zea3y5BprbnWBSf2iHtd/A5IpW1dlr2rfjv3dGiIs7UIiINsiIs7cIiICIiAiIgIiIBVKqUFBCKUQQpREBERAREQEREBERBjV3Adqw1ONVeTK0ceN/qWp/CDlpx45mu2DPlrF5hy/dcPyFP8Arv8A4Qu4wzCqWmpYGimhtu2f8NrnPeWgkkkak6m5Wgxemiq2tbUR7xrSSBdzbE8fFIWzhxixjie0OjJawDgW8zbFRbBaZ2nH9qpERVtd1B+ZN9jGqXNpxxo2jthjCym0EXHdt+tH0sTBcta0dNyP6qnVPDZq89mHem/NI/ZRJmpvzWP2USvRyU7n7trmF9r5A45iOPC6ye84/o/Wfep/V+JJrkju4uWRxJEcQsXuLWsAaACSQBwC1ddjTYJ4qaQObNIWhrbE3LnZW6jQar0htGwG4aPrK8p7ocYGNYfbpp/5grT6npqsMXoo6zaZ26d9JUEklgJJuSXgkn0q/h2HSCRskgDQ29mg3JJFubmsStyimctpjSmMFYne5ERFUvEREG2REWduFyXdK2rkwqliqIoo5XPqBEWyFwABjkdcZefkD0rrV5l3f/yfTf8AXt/wJ1Ej00LlNmdqpKvEcSonxxsZSuAa9pdmkBc4cq+nNzLVjabG/wD6Bn/txe9ajuUzyyYtjck8O5nduy+AOD92/PJycw0Paudjf7S7eujqvwdh1I6vrh47QckcGl+W7nIuL6gC4F76LW1O2GMUI3+I4XC6lFi+SkkBdCOckZ3cOuw/vKx3AwJKauqn8qokq7SPPjEbtr9f25JD516e+MPBY4BzXAtLTqHNIsQR0WQaqPaSmdQnEmSZqUROkLwOUA2+ZpbzPBBFulcRS7Y4zVxGsosLpu9LksbLIXTTMabEtGdvQebm0utf3K8MFVQY1hpc4UxqXxseOVkDmltxfj4kbuu/WsjC5cawWEUzqKLEqOK+R9O8tkay5NrWLjx4ZDbpKbHYbBbXx4tTGZjDFIx+SSInNkfa4INhdpHUOBHMuS2d26xfEI3y0mG0ckbJDG5xm3dnhodaz3C+jm+ldnsXtTT4nA6ana6NzXZZIXgB8b7XF7aEEcD28CCF5Z3KNpZ6Olnjhwyrrmuqi8y0/isdu4xkPJOtgD+0E2PQtkNtHVVTLh9ZSuoq6JuYxZt4yRnJuWu6eU021BBuCdbU7I7WT17cTtDEJKaZ8UTGkgTOGfLnJOly0ela3Y/B6yoxWXGa6AUYMW6ipS4PfazRmcRzAB3EAku4ADWx3Gv95jP/AHF38UiCzjm3OL0W575w6jj30gjjtNnzSG2nJebceJXWbMV2JySPbiFFT00QZdr4pRKXSZhySA42FrnzLmO7UfyR/wBxZ9rV6YVMDlu6HtU7DKZksbGSzyTNjjjfezjqXEhuvAW7SFd2B2m/CdE2pc1jJRI+OSNly1j2m4tfXVhYdelcriv+0tpaam8aDDot6/S435yvt6xp/Ucmx3+zsexDDTyYakd8wg2AzavIaOwyN/8ACo31HQ7XbVyUVbhdKyON7aubI57y4GMbyJl220J+UPHoXWLzTun/AJX2d/6o/wCPTL0xTAhFKLoFClEGg2i8dv6n9SsGKpsAO+qhn91rCQ3qBzLeYvhm/AyvyOHPbMCOgi4WgOCyDTfN9T4ltxWpNIiZ7PMzUyVyTaI7/X/sLorP/wBlV6h+8tXM6z4yT/xW6/tBa7a+tfhzI3m02dzhYfJ5coB678VshhczwxxFwWhwA6xfW6tpOOPf8/2U3rmtq3H/AD/mXdwHkjsXPba1kzBSw07Gl809nSPaXNiia0lziARrqLa6re0JJjYSCDlFweIKs4vTh8TnfOYC9pHSAdOw+7oXl5JmInT28U/pRLzuira2DFaUVLWSte/dbyNrrZHNLQRqctri4PQe1epFchs61tTUukdf5FrS1p+m64v5gD5yOhdcq8N5vXcrftH7et7F5L3Rfy3h/bT/AMwV60vJe6L+W8P7af8AmCr6s9uzvquoEYuQSSbBo4uceACobh9U+zjJHHf5gbny9puFbl/tVNewF3WvqM2UrdVwlOTdFuW/Lucri3+6baHj9S0WtNdRGuvlTjrGttJFUPZIIZw3Mb5ZGatfbiOo9X+jnKxtGBkpwAGnfx5W2F268rgSOFlfU73WLK8lYiegiIuXDbIuY8LT5Aev8KeFp8gPafCnpcvj4beUOnXn3drwqeqoaeOmglne2sa4siaXkM3MwuQOa5A863XhafID2nwp4WnyA9p8KifsmWfb4OUOnXAbEYVPFjGNzyQyxxSvaY5XNIbKA955J5+IW4O1p8gPafCnhafID2nwp6TL4+DlDmqzAa7CK2etwuFtZSVDs01BmyPY+5Jcw9Fy6xFzyiC02BFVftPi9cx1NR4RNROeMrqqqdlEIOhLbtbr18oj6K6PwtPkB7T4U8LT5Ae0+FR6TN4+DlC3gGx5oMLfQ005jqXMc41YFv8A5LgLOt9EWa23QOlc3hO1OL0URpavCauuqGl2WqicC2UEkjO5rSLC9r8bWuAV1HhafID2nwp4WnyA9p8Kejy+Pg5Q1vct2Zno2VdVWBrKmsn3joWG4iaC9wGhIveR+gJsLarG7imEz0tFUMqYJYHurHODZWlhLN1ELgHmuD6Fu/C0+QHtPhTwtPkB7T4U9Jl8fByh04XAdyrC5qd+KmeGWESVznsMjS3eMLpOU2/EahbjwtPkB7T4U8LD5Ae0+FT6TL4+DlDTd1nCp6n8Gd7wyzbuua9+7aXbtgy8p1uAXeVMuRj35XPytc7IwZnOsL2aBxJXOeFh8gPafCnhafID2nwp6TL4+DlDidkO5ya1k9binflPUzVMj93G8wuDCbkuBaT4xdbqATafYJ2Gy0NfhjayqliqRvI3O37zFx00BDbB7T/zF23hYfID2nwp4WnyA9p8Kj0eXx8HKHO91GjqH1mD1dNSVFU2nkfK9kTSSLSQPDTpyScp49BW/wBndqamqnEU2E1lGzI47+Y3aCODfFGpWdhW0G/lbFustwdc2bgL8LBY+F7UmerNLuA2zpBvM+bxL/NyjjbpUemy9enaNz27HJ0iIiqSKFUqJHhoLjoALnsQVLX1jLOvzHXz861uI7RAxS7nM17W3DyAQACNbKqfH4yLOa8OHHhoefnWiuDJHXSvJq0OK7r3+4p/13/wtXp1CPkYf+Uz+ALg9qoI66LLa+W7RmuLSSWDTodbWK6rDscitFCcwdlawEjQuDQPNwUZMN++jH0rqW2leGNLugcFoKrEszXBzyOU3kN+c3W9j1aHVbysiL2FrSATbjw4rQO2fl+lH6T7lnmInpL0vsn3Wpm86lTWtjgcHQyPuRcubbUOBsP6+hZuz+JvlMkMtjIz54Fs7b2uR03+1YrMDmHB0XZqR6C1ZOD4RJFM6V7mEFhbZtzckg9A6FzWsVjULcv3M45jlEz7T7t2vJe6L+W8P7af+YK9aXkvdE/LeH9tP/MFWV7vLt2d5W0okba5aQbteOLXDnUNr6poDTHFJb54dkzfrNP9FcdOA4N5z9trq6tPtqY2yxa1WHHA98gmnc1zwLNYzxIweNr8T1rMV1sDi3NY+g6jpVpRy25tuesiIihDiUV7vSTyUvqO9yd6SeSl9R3uXr86+WnSytjhNI2Vswd4+VoYeiQusB5zYedYneknkpfUd7lWyCZoIDJgDa9muF7G45uYrjJMTXUTpMNiMLae9mWOdz3CU66ANY+wHSGu9N1LsPjEkhex0cZpxI0XJMRc5jT25SXac4WAROb3bPrmvyXa5rZr6c9hfsVIjmDcoZNlsRlyutYkEjhwuAVTxt+/+d7S2UWFBr2B8ZeG05e9jCTvHbx7W2IPA8k6cwVl9C2HeZ2teRNuwZC5rGNy5g92TXUWt51iPZOW5S2ctsBlLXEWbfKOHAXPpVURqGnM0TtOUNuGuF2gWAOnAJxv72j+4zZKSNglc5sQsYi0PdK5rQ9j3WBYAbmwtmHBBhjDuHi4Zu2mbqu3NcdGbVo6wsON1Q0uLROC43ccrruPSdNeJVGSe1ss1rNFsruDfFHDmTjf978foM2vpoo2Os2MOM0zRmMmbK14AyWOXQH5yuV2Hxt74kY27GENDSTyJGytaWmxuQWm47TzhYJdUFpaROWkkkZXWJJuTw5yqCyc57tm5Zu7ku5Zvflaa6pFLR/6/H+AqxQNGQMjay8THkgvNy5oJ8Zx0CyquKFuV4jG6Eoa6zpGyNBadJGO+foTcaaWWC+CV1rxymwAF2u0aBYDh0KuYTvAa8TuA4BwebfUuuPb9L+PVDLNNFG90bg1xZHrI7ebsyFw8bJqGhpt2qndMZ3yHQMvG0OaC97rZnsAFw4XFnX4XWMzvgOLwJw88XBrrnt01VJimOYlkxLvGJa45tQddNdQFEVn3t+I2TaWLewRlsZBY1zw0y7w3hzG9zlsTrp1Ky/DWsinc7lOABiPC8edgz+cPFuwrHLqizR8vZvi6O5OltNOgkK2Y5rWyzWyhtsrvEBuG8OF9VEVtE/tePf6jL2X/tUfY7+ErA2X/Kjv15/8y2mzVO9tSwuY8CztS0geKecrXbMROGKOJa4DPPqQQPnc67m0frf5P9j0NEReMsFbqIN4xzL2zNIvxtfqVxVM4hN66jmm7JvabiosephH+ZUHZFx4zj1D95bnaSpdHAXMOU5gLjjbX3LlBXVJax4kkIc/ILOJOf6JF9Cb6LdhtnyV5coj+kf6cTptI9lHt8Wpt2MI/wAyx6nZowgS74HK4G2S19enMsHEcXlic5rJ5HOYBmcXXaZR4wA52jh5iuvxg/IHrA+0KL3zU1ue/wBP+JiIYtZVvjga9gubgE2zWFuj0LWx45JflOIHSIs2vYbLeUxIjblAd1E2VW8d9BnrBUVtWOkwpyY7WtuLTDSOxx1tHvJ64QB6cx+xXsKxWWSVrHC7Te5y2y2B1v22HnW13j/oM9cKpj33HIaB0h10m9dTHH4RGK3KJ5T+f6r68k7oxtjNAejcfzDl62vIe6W62MUR6BCfRO5V07tEuqFTmqomdGYntylbxrr36ly+zxLp5J3A5Q3KD0knW3o+tdNDKHXtzGy25o6s+WOq+JSAW30v9ioRFRpVsREQbZSoRZm5KhEQSoREBSoRBKKEQEREEqERAREQEREC6XREBERSCqZxCpS9lAwto6V8sDmxjM4EHLcDNbmBOl9VytLRVsWbdwOGbjyojYjgRd2hGuq6908vkwf2go38vkh6wWjFmtSvHUTH1RMOH8H6pwybhzb6ZnPZYX5zZxK7HH5Wx0znPcGta0EucbAAWuSeZXjPN5IesFrdoKKWsp5aVzN22RpaXhzSWg8bDpU5M1ssxy10RrS3R7VUQYL1lL7VnvU+EWHfnVH7WP3rjG9yRn5xP6WfdU/imZ5eb9z7qr117pdl4RYd+dUftWe9Vs2ooG6Nq6QC/NKz3rhZO5QBwmmPZk+6rf4sGeXm/c+6pim/dxN4h6ANrKH89pfax+9cTtJg8mJ18VVTFhpY2sBnc6zZS2RznCKwJfobX4X59Csb8V8Xl5/Nk+6u1iY9jGxsjAa1oa1ocAA0CwA8y6rj6rsM47z+lOmC+F8bQ1gBNwBY2A7VtqWLIwNvc856XHiVrZ6WZ58UD9oLaQA5W5vGsLnpK0ZbbiOqPtlMURE47b8wuIirjiLuAPaqNsERMqFXHEXcAsqKjHF2vUskCyrnJ4XVxT7iIiraBERAREQEREBERAREQEREBERAREQEQIgIiICIpUC2+XL8x7uttv6lU99foZv3fvK6iCz33+gl/d+8o77PkJfS33q+hU9Ba75/Qzfu+9Ums/QTehv3lfRQMfv79BN+771S6qB4083oaf6rKUFT0GOIGu+a5vaUNEOkrJRTylzwr4YveQ6SqhRt6yshE5Sj7uvhbZC0cAPtVxEUOoiI7CIiJEREBERAREQEREBERAREQEREBERAUKUQEREBERQCIikEREBERAREQEREAIoCmyAiIgWREQERCUH/2Q==",
      className: "absolute top-45 left-[50%] rotate-[10deg]",
      languages : ["React", "Node.js", "MongoDB"],
    },
   
  ];
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        "Turning ideas into impactful digital experiences.
Designing solutions that users love and trust."
      </p>
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
         {item.languages && (
  <div className="mt-3 flex flex-wrap justify-center gap-2">
    {item.languages.map((lang) => (
      <Badge key={lang}>{lang}</Badge>
    ))}
  </div>
)}
<Button className="w-full mt-3">Learn More </Button>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}

export default function Page() {
  return <DraggableCardDemo />;
}