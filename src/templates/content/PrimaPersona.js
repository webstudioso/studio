const template = `
<div class="bg-neutral-950">
   <section>
      <div class="mx-auto max-w-7xl px-8 py-12 lg:pt-24">
         <div class="mx-auto max-w-xl">
            <div>
               <div class="md:flex md:items-center md:justify-between md:space-x-5">
                  <div class="flex items-center space-x-5">
                     <div class="flex-shrink-0">
                        <div class="relative"><img alt="image" class="rounded-full border border-white/10 h-16 lg:h-24 lg:w-24 w-16" src="https://primapersona.lexingtonthemes.com/images/avatar.jpg"> <span aria-hidden="true" class="rounded-full absolute inset-0 shadow-inner"></span></div>
                     </div>
                     <div class="pt-1.5">
                        <h1 class="dark:text-white text-black lg:text-xl">✺ Michael Alexander Andreuzza</h1>
                        <p class="text-neutral-500 font-light text-sm">Software Engineer in Seattle</p>
                        <p><a class="dark:text-white duration-200 hover:no-underline text-xs underline" href="#">michaelandreuzza.com</a></p>
                     </div>
                  </div>
               </div>
               <div class="font-light text-sm mt-24">
                  <p class="dark:text-white text-black">About</p>
                  <div class="text-neutral-500 dark:text-neutral-400 mt-3 space-y-3">
                     <p>For the past 15 years, I have been a hands-on and adaptable problem solver, collaborating with start-ups, e-commerce businesses, agencies, and consulting firms.</p>
                     <p>specialize in front-end development, but also have experience with back-end development and cloud infrastructure.</p>
                     <p>I am skilled in leading software projects and have the ability to manage, mentor, and hire software engineers.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   <section>
      <div class="mx-auto max-w-7xl px-8 py-12">
         <div class="mx-auto max-w-xl">
            <div class="grid gap-12 md:gap-24">
               <div class="font-light text-sm">
                  <p class="dark:text-white text-black">Work experience</p>
                  <div class="grid gap-6 mt-3">
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">13.02.2023</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://lexingtonthemes.com">Working on Lexington Themes</a></p>
                           <p class="">Åland Islands, Finland</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">10.02.2022</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://unwrapped.design">Built Unwrapped</a></p>
                           <p class="">Åland Islands, Finland</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">10.02.2022</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://colorsandfonts.com">Created Colors &amp; fonts</a></p>
                           <p class="">Åland Islands, Finland</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">01.05.2022</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">New Product Launch</a></p>
                           <p class="">San Francisco, CA</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">15.06.2022</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">E-commerce Website Redesign</a></p>
                           <p class="">New York, NY</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">10.08.2022</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Mobile App Development</a></p>
                           <p class="">London, UK</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">01.09.2022</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Marketing Campaign Strategy</a></p>
                           <p class="">Sydney, Australia</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">15.10.2022</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Social Media Management</a></p>
                           <p class="">Paris, France</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">10.11.2022</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">UI/UX Design</a></p>
                           <p class="">Tokyo, Japan</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">01.12.2022</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Content Creation</a></p>
                           <p class="">Toronto, Canada</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">15.01.2020</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">SEO Optimization</a></p>
                           <p class="">Berlin, Germany</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">10.02.2020</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Brand Identity Development</a></p>
                           <p class="">São Paulo, Brazil</p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">01.03.2020</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://example.com">Video Production</a></p>
                           <p class="">Seoul, South Korea</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="font-light text-sm">
                  <p class="dark:text-white text-black">Contact</p>
                  <div class="grid gap-6 mt-3">
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">Email</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="mailto:email@example.com" title="Email">michael@andreuzza.com</a></p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">Twitter</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://twitter.com/Mike_Andreuzza" title="Twitter">Mike_Andreuzza</a></p>
                        </div>
                     </div>
                     <div class="grid grid-cols-1 items-start md:grid-cols-3 text-neutral-500">
                        <div>
                           <p class="dark:text-neutral-400 text-neutral-400">Read CV</p>
                        </div>
                        <div class="md:col-span-2 w-full">
                           <p class="dark:text-white text-black"><a class="duration-200 hover:no-underline underline after:content-['_↗']" href="https://read.cv/join/michael_andreuzza" title="Read CV">michael_andreuzza</a></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   <div id="mailgo" class="m-modal" role="dialog" tabindex="-1" aria-labelledby="m-title" style="display: none;">
      <div class="m-modal-back"></div>
      <div class="m-modal-content">
         <strong id="m-title" class="m-title"></strong>
         <div id="m-details" class="m-details">
            <p id="m-cc"><span class="w-500">cc </span><span id="m-cc-value"></span></p>
            <p id="m-bcc"><span class="w-500">bcc </span><span id="m-bcc-value"></span></p>
            <p id="m-subject"><span class="w-500">subject </span><span id="m-subject-value"></span></p>
            <p id="m-body"><span class="w-500">body </span><span id="m-body-value"></span></p>
         </div>
         <a id="m-gmail" href="#mailgo-gmail" class="m-open m-gmail">open in <span class="w-500">Gmail</span></a><a id="m-outlook" href="#mailgo-outlook" class="m-open m-outlook">open in <span class="w-500">Outlook</span></a><a id="m-yahoo" href="#mailgo-yahoo" class="m-open m-yahoo">open in <span class="w-500">Yahoo Mail</span></a><a id="m-open" href="#mailgo-open" class="m-open m-default"><span class="w-500">open</span> default</a><a id="m-copy" href="#mailgo-copy" class="m-copy w-500">copy</a><a id="m-custom-action" href="#mailgo-custom-action" class="m-open m-custom-action"></a><a href="https://mailgo.dev?ref=mailgo-modal" class="m-by" target="_blank" rel="noopener noreferrer">mailgo.dev</a>
      </div>
   </div>
   <div id="mailgo-tel" class="m-modal" role="dialog" tabindex="-1" aria-labelledby="m-tel-title" style="display: none;">
      <div class="m-modal-back"></div>
      <div class="m-modal-content">
         <strong id="m-tel-title" class="m-title"></strong>
         <div id="m-tel-details" class="m-details">
            <p id="m-msg"><span class="w-500">body </span><span id="m-msg-value"></span></p>
         </div>
         <a id="m-tg" href="#mailgo-telegram" class="m-open m-tg" style="display: none;">open in <span class="w-500">Telegram</span></a><a id="m-wa" href="#mailgo-whatsapp" class="m-open m-wa">open in <span class="w-500">WhatsApp</span></a><a id="m-skype" href="#mailgo-skype" class="m-open m-skype">open in <span class="w-500">Skype</span></a><a id="m-call" href="#mailgo-open" class="m-open m-default"><span class="w-500">call</span> as default</a><a id="m-tel-copy" href="#mailgo-copy" class="m-copy w-500">copy</a><a href="https://mailgo.dev?ref=mailgo-modal" class="m-by" target="_blank" rel="noopener noreferrer">mailgo.dev</a>
      </div>
   </div>
</div>
`

const style = `
`
const metadata = {
   image: 'https://bafybeibbafcvyrp2h765rnx6tq4fsnea2m6hyfnlkyq56nwupe4owk5tde.ipfs.w3s.link/ProfilePreview.png',
   preview: 'https://bafybeicvszfap2mkwpj3oiagds4gpvsdh33j3lsuy7aaq3kc7c2of7yspu.ipfs.w3s.link/Profile.png',
   name: 'Prima Persona',
   description: 'An eye-catching persona website',
   tags: ['Landing Page'],
   premium: false
}

export { template, style, metadata }