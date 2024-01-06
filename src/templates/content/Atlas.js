const template = `
<div class="bg-slate-900" data-new-gr-c-s-check-loaded="14.1106.0" data-gr-ext-installed="">

    
    <div id="main" class="w-8/12 mx-auto">
      <div class="container">
  <div class="flex items-center justify-between py-6 lg:py-10">
    <a href="/" class="flex items-center">
      <span href="/" class="mr-2">
        <img src="https://atlas.redpixelthemes.com/assets/img/logo.svg" alt="logo">
      </span>
      <p class="hidden font-body text-2xl font-bold text-primary dark:text-white lg:block">
        John Doe
      </p>
    </a>
    <div class="flex items-center lg:hidden">
      <i class="bx mr-8 cursor-pointer text-3xl text-primary dark:text-white bxs-sun" @click="themeSwitch()" :class="isDarkMode ? 'bxs-sun' : 'bxs-moon'"></i>

      <svg width="24" height="15" xmlns="http://www.w3.org/2000/svg" @click="isMobileMenuOpen = true" class="fill-current text-primary dark:text-white">
        <g fill-rule="evenodd">
          <rect width="24" height="3" rx="1.5"></rect>
          <rect x="8" y="6" width="16" height="3" rx="1.5"></rect>
          <rect x="4" y="12" width="20" height="3" rx="1.5"></rect>
        </g>
      </svg>
    </div>
    <div class="hidden lg:block">
      <ul class="flex items-center">
        
        <li class="group relative mr-6 mb-1">
          <div class="absolute left-0 bottom-0 z-20 h-0 w-full opacity-75 transition-all group-hover:h-2 group-hover:bg-yellow"></div>
          <a href="/" class="relative z-30 block px-2 font-body text-lg font-medium text-primary transition-colors group-hover:text-green dark:text-white dark:group-hover:text-secondary">Intro</a>
        </li>
        
        <li class="group relative mr-6 mb-1">
          <div class="absolute left-0 bottom-0 z-20 h-0 w-full opacity-75 transition-all group-hover:h-2 group-hover:bg-yellow"></div>
          <a href="/blog" class="relative z-30 block px-2 font-body text-lg font-medium text-primary transition-colors group-hover:text-green dark:text-white dark:group-hover:text-secondary">Blog</a>
        </li>
        
        <li class="group relative mr-6 mb-1">
          <div class="absolute left-0 bottom-0 z-20 h-0 w-full opacity-75 transition-all group-hover:h-2 group-hover:bg-yellow"></div>
          <a href="/uses" class="relative z-30 block px-2 font-body text-lg font-medium text-primary transition-colors group-hover:text-green dark:text-white dark:group-hover:text-secondary">Uses</a>
        </li>
        
        <li class="group relative mr-6 mb-1">
          <div class="absolute left-0 bottom-0 z-20 h-0 w-full opacity-75 transition-all group-hover:h-2 group-hover:bg-yellow"></div>
          <a href="/contact" class="relative z-30 block px-2 font-body text-lg font-medium text-primary transition-colors group-hover:text-green dark:text-white dark:group-hover:text-secondary">Contact</a>
        </li>
        
        <li>
          <i class="bx cursor-pointer text-3xl text-primary dark:text-white bxs-sun" @click="themeSwitch()" :class="isDarkMode ? 'bxs-sun' : 'bxs-moon'"></i>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="pointer-events-none fixed inset-0 z-50 flex bg-black bg-opacity-80 opacity-0 transition-opacity lg:hidden" :class="isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : ''">
  <div class="ml-auto w-2/3 bg-green p-4 md:w-1/3">
    <i class="bx bx-x absolute top-0 right-0 mt-4 mr-4 text-4xl text-white" @click="isMobileMenuOpen = false"></i>
    <ul class="mt-8 flex flex-col">
      
      <li class="">
        <a href="/" class="mb-3 block px-2 font-body text-lg font-medium text-white">Intro</a>
      </li>
      
      <li class="">
        <a href="/blog" class="mb-3 block px-2 font-body text-lg font-medium text-white">Blog</a>
      </li>
      
      <li class="">
        <a href="/uses" class="mb-3 block px-2 font-body text-lg font-medium text-white">Uses</a>
      </li>
      
      <li class="">
        <a href="/contact" class="mb-3 block px-2 font-body text-lg font-medium text-white">Contact</a>
      </li>
      
    </ul>
  </div>
</div>


      <div><div class="container mx-auto">
  <div class="border-b border-grey-lighter py-16 lg:py-20">
    <div>
      <img src="https://atlas.redpixelthemes.com/assets/img/author.png" class="h-16 w-16" alt="author">
    </div>
    <h1 class="pt-3 font-body text-4xl font-semibold text-primary dark:text-white md:text-5xl lg:text-6xl">
      Hi, I’m John Doe.
    </h1>
    <p class="pt-3 font-body text-xl font-light text-primary dark:text-white">
      A software engineer and open-source advocate enjoying the sunny life in Barcelona, Spain.
    </p>
    <a href="/" class="mt-12 block bg-teal-500 px-10 py-4 text-center font-body text-xl font-semibold text-white transition-colors hover:bg-green sm:inline-block sm:text-left sm:text-2xl">
      Say Hello!
    </a>
  </div>

  <div class="border-b border-grey-lighter py-16 lg:py-20">
    <div class="flex items-center pb-6">
      <img src="https://atlas.redpixelthemes.com/assets/img/icon-story.png" alt="icon story">
      <h3 class="ml-3 font-body text-2xl font-semibold text-primary dark:text-white">
        My Story
      </h3>
    </div>
    <div>
      <p class="font-body font-light text-primary dark:text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus
        mattis molestie. Et leo duis ut diam. Sit amet tellus cras adipiscing
        enim eu turpis. Adipiscing at in tellus integer feugiat.
        <br>
        <br>
        Maecenas accumsan lacus vel facilisis. Eget egestas purus viverra
        accumsan in nisl nisi scelerisque eu. Non tellus orci ac auctor augue
        mauris augue neque gravida. Auctor augue mauris augue neque gravida in
        fermentum et sollicitudin. Tempus urna et pharetra pharetra massa massa
        ultricies mi quis. Amet mauris commodo quis imperdiet massa. Integer
        vitae justo eget magna fermentum iaculis eu non.
      </p>
    </div>
  </div>

  <div class="py-16 lg:py-20">
    <div class="flex items-center pb-6">
      <img src="https://atlas.redpixelthemes.com/assets/img/icon-story.png" alt="icon story">
      <h3 class="ml-3 font-body text-2xl font-semibold text-primary dark:text-white">
        My Story
      </h3>
      <a href="/blog" class="flex items-center pl-10 font-body italic text-green transition-colors hover:text-secondary dark:text-green-light dark:hover:text-secondary text-white">
        All posts
        <img src="https://atlas.redpixelthemes.com/assets/img/long-arrow-right.png" class="ml-3" alt="arrow right">
      </a>
    </div>
    <div class="pt-8">
      <div class="border-b border-grey-lighter pb-8">
        <span class="mb-4 inline-block rounded-full bg-green-100 px-2 py-1 font-body text-sm text-green">category</span>
        <a href="/post" class="block font-body text-lg font-semibold text-primary transition-colors hover:text-green dark:text-white dark:hover:text-secondary">Quis hendrerit dolor magna eget est lorem ipsum dolor sit</a>
        <div class="flex items-center pt-4">
          <p class="pr-2 font-body font-light text-primary dark:text-white">
            July 19, 2020
          </p>
          <span class="font-body text-grey dark:text-white">//</span>
          <p class="pl-2 font-body font-light text-primary dark:text-white">
            4 min read
          </p>
        </div>
      </div>
      <div class="border-b border-grey-lighter pt-10 pb-8">
        <div class="flex items-center">
          <span class="mb-4 inline-block rounded-full bg-blue-100 px-2 py-1 font-body text-sm text-blue-dark">category</span>
          <span class="mb-4 ml-4 inline-block rounded-full bg-yellow-100 px-2 py-1 font-body text-sm text-yellow-dark">category</span>
        </div>
        <a href="/post" class="block font-body text-lg font-semibold text-primary transition-colors hover:text-green dark:text-white dark:hover:text-secondary">Senectus et netus et malesuada fames ac turpis egestas integer</a>
        <div class="flex items-center pt-4">
          <p class="pr-2 font-body font-light text-primary dark:text-white">
            June 30, 2020
          </p>
          <span class="font-body text-grey dark:text-white">//</span>
          <p class="pl-2 font-body font-light text-primary dark:text-white">
            5 min read
          </p>
        </div>
      </div>
      <div class="border-b border-grey-lighter pt-10 pb-8">
        <span class="mb-4 inline-block rounded-full bg-blue-100 px-2 py-1 font-body text-sm text-blue">category</span>
        <a href="/post" class="block font-body text-lg font-semibold text-primary transition-colors hover:text-green dark:text-white dark:hover:text-secondary">Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies</a>
        <div class="flex items-center pt-4">
          <p class="pr-2 font-body font-light text-primary dark:text-white">
            June 26, 2020
          </p>
          <span class="font-body text-grey dark:text-white">//</span>
          <p class="pl-2 font-body font-light text-primary dark:text-white">
            3 min read
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="pb-16 lg:pb-20">
    <div class="flex items-center pb-6">
      <img src="https://atlas.redpixelthemes.com/assets/img/icon-project.png" alt="icon story">
      <h3 class="ml-3 font-body text-2xl font-semibold text-primary dark:text-white">
        My Projects
      </h3>
    </div>
    <div>
      
      <a href=" / " class="mb-6 flex items-center justify-between border border-grey-lighter px-4 py-4 sm:px-6">
        <span class="w-9/10 pr-8">
          <h4 class="font-body text-lg font-semibold text-primary dark:text-white">
            TailwindCSS
          </h4>
          <p class="font-body font-light text-primary dark:text-white">
            Rapidly build modern websites without ever leaving your HTML.
          </p>
        </span>
        <span class="w-1/10">
          <img src="https://atlas.redpixelthemes.com/assets/img/chevron-right.png" class="mx-auto" alt="chevron right">
        </span>
      </a>
      
      <a href=" / " class="mb-6 flex items-center justify-between border border-grey-lighter px-4 py-4 sm:px-6">
        <span class="w-9/10 pr-8">
          <h4 class="font-body text-lg font-semibold text-primary dark:text-white">
            Maizzle
          </h4>
          <p class="font-body font-light text-primary dark:text-white">
            Framework for Rapid Email Prototyping
          </p>
        </span>
        <span class="w-1/10">
          <img src="https://atlas.redpixelthemes.com/assets/img/chevron-right.png" class="mx-auto" alt="chevron right">
        </span>
      </a>
      
      <a href=" / " class="mb-6 flex items-center justify-between border border-grey-lighter px-4 py-4 sm:px-6">
        <span class="w-9/10 pr-8">
          <h4 class="font-body text-lg font-semibold text-primary dark:text-white">
            Alpine.js
          </h4>
          <p class="font-body font-light text-primary dark:text-white">
            Think of it like Tailwind for JavaScript.
          </p>
        </span>
        <span class="w-1/10">
          <img src="https://atlas.redpixelthemes.com/assets/img/chevron-right.png" class="mx-auto" alt="chevron right">
        </span>
      </a>
      
      <a href=" / " class="mb-6 flex items-center justify-between border border-grey-lighter px-4 py-4 sm:px-6">
        <span class="w-9/10 pr-8">
          <h4 class="font-body text-lg font-semibold text-primary dark:text-white">
            PostCSS
          </h4>
          <p class="font-body font-light text-primary dark:text-white">
            A tool for transforming CSS with JavaScript
          </p>
        </span>
        <span class="w-1/10">
          <img src="https://atlas.redpixelthemes.com/assets/img/chevron-right.png" class="mx-auto" alt="chevron right">
        </span>
      </a>
      
    </div>
  </div>
</div>
</div>

      <div class="container mx-auto pb-24">
  <div class="flex flex-col items-center justify-between border-t border-grey-lighter py-10 sm:flex-row sm:py-12">
    <div class="mr-auto flex flex-col items-center sm:flex-row">
      <a href="/" class="mr-auto sm:mr-6">
        <img src="https://atlas.redpixelthemes.com/assets/img/logo.svg" alt="logo">
      </a>
      <p class="pt-5 font-body font-light text-primary dark:text-white sm:pt-0">
        ©2020 John Doe.
      </p>
    </div>
    <div class="mr-auto flex items-center pt-5 sm:mr-0 sm:pt-0">
      
      <a href="https://github.com/ " target="_blank">
        <i class="text-4xl text-primary dark:text-white pl-5 hover:text-secondary dark:hover:text-secondary transition-colors bx bxl-github"></i>
      </a>
      
      <a href="https://codepen.io/ " target="_blank">
        <i class="text-4xl text-primary dark:text-white pl-5 hover:text-secondary dark:hover:text-secondary transition-colors bx bxl-codepen"></i>
      </a>
      
      <a href="https://www.linkedin.com/ " target="_blank">
        <i class="text-4xl text-primary dark:text-white pl-5 hover:text-secondary dark:hover:text-secondary transition-colors bx bxl-linkedin"></i>
      </a>
      
    </div>
  </div>
</div>

    </div>

    <script src="/assets/js/main.js"></script>

    
    <script src="https://guanaco.redpixelthemes.com/script.js" data-site="SPSADKNQ" defer=""></script>
    
  
</div>
`

const style = `

`
const metadata = {
   image: 'https://bafybeidpgt3zd5z4legabpuj2hp2xevyqyp4srr5jd55vbvy5kolna7l4u.ipfs.w3s.link/Atlas.png',
   preview: 'https://bafybeib2oakvgcv7hajmkefg2sdtnlnfd3ffqhm2h2rjksrk7txjyg2gai.ipfs.w3s.link/AtlasPreview.png',
   name: 'Atlas',
   description: 'template.atlas',
   tags: ['landing_page'],
   premium: false
}

export { template, style, metadata }