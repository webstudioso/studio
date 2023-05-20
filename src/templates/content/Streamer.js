const template = `
<div class="bg-black">
   <div class="mx-auto w-full bg-black border-b border-white justify-center">
      <div class="flex flex-col w-full border-x lg:flex-row lg:items-center lg:justify-between max-w-7xl mx-auto px-8 py-2" x-data="{ open: false }">
         <div class="items-center flex text-white flex-row justify-between">
            <a href="/" class="flex-shrink-0 block group">
               <div class="items-center flex">
                  <div>
                     <svg fill="none" viewBox="0 0 44 48" height="28" width="23" xmlns="http://www.w3.org/2000/svg" id="logo-71">
                        <path d="M23.2 8.04745C23.2 6.96404 22.9478 5.89551 22.4632 4.92647C22.0444 4.08884 21.7985 3.17549 21.7401 2.24081L21.6 0L21.46 2.24073C21.4015 3.17542 21.1556 4.0888 20.7368 4.92644C20.2523 5.8955 20 6.96406 20 8.04749V39.9525C20 41.0359 20.2523 42.1045 20.7368 43.0736C21.1556 43.9112 21.4015 44.8246 21.46 45.7593L21.6 48L21.7401 45.7592C21.7985 44.8245 22.0444 43.9112 22.4632 43.0735C22.9478 42.1045 23.2 41.036 23.2 39.9525V8.04745ZM14.4632 8.12647C14.9478 9.09551 15.2 10.1641 15.2 11.2475V36.7525C15.2 37.836 14.9478 38.9045 14.4632 39.8736C14.0444 40.7112 13.7985 41.6246 13.74 42.5592L13.6 44.8L13.46 42.5592C13.4015 41.6246 13.1556 40.7112 12.7368 39.8736C12.2522 38.9045 12 37.836 12 36.7525V11.2475C12 10.1641 12.2522 9.09551 12.7368 8.12647C13.1556 7.28883 13.4015 6.37547 13.46 5.44078L13.6 3.20001L13.74 5.44078C13.7985 6.37547 14.0444 7.28883 14.4632 8.12647ZM11.2 14.4475C11.2 13.364 10.9478 12.2955 10.4632 11.3265C10.0444 10.4888 9.79847 9.57545 9.74005 8.64076L9.6 6.39999L9.45995 8.64076C9.40153 9.57545 9.15559 10.4888 8.73677 11.3265C8.25225 12.2955 8 13.364 8 14.4475V33.5525C8 34.6359 8.25225 35.7045 8.73677 36.6735C9.15559 37.5112 9.40153 38.4245 9.45995 39.3592L9.6 41.6L9.74005 39.3592C9.79847 38.4245 10.0444 37.5112 10.4632 36.6735C10.9478 35.7045 11.2 34.6359 11.2 33.5525V14.4475ZM6.46323 17.7264C6.94775 18.6955 7.2 19.764 7.2 20.8475V27.1525C7.2 28.2359 6.94775 29.3045 6.46323 30.2735C6.04441 31.1112 5.79847 32.0245 5.74005 32.9592L5.6 35.2L5.45995 32.9592C5.40153 32.0245 5.15559 31.1112 4.73677 30.2735C4.25225 29.3045 4 28.2359 4 27.1525V20.8475C4 19.764 4.25225 18.6955 4.73677 17.7264C5.15559 16.8888 5.40153 15.9754 5.45995 15.0408L5.6 12.8L5.74005 15.0408C5.79847 15.9754 6.04441 16.8888 6.46323 17.7264ZM3.19984 24L3.2 24.0475V23.9525L3.19984 24ZM0 24.0475L0.000161422 24C0.00741925 25.0672 0.259327 26.1187 0.736771 27.0735C1.15559 27.9112 1.40153 28.8245 1.45995 29.7592L1.6 32L1.74005 29.7592C1.79847 28.8245 2.04441 27.9112 2.46323 27.0735C2.94067 26.1187 3.19258 25.0672 3.19984 24C3.19258 22.9328 2.94067 21.8813 2.46323 20.9265C2.04441 20.0888 1.79847 19.1755 1.74005 18.2408L1.6 16L1.45995 18.2408C1.40153 19.1755 1.15559 20.0888 0.736771 20.9265C0.259327 21.8813 0.00741927 22.9328 0.000161422 24L0 23.9525V24.0475ZM18.4632 4.92646C18.9478 5.8955 19.2 6.96405 19.2 8.04747V39.9525C19.2 41.036 18.9478 42.1045 18.4632 43.0735C18.0444 43.9112 17.7985 44.8245 17.74 45.7592L17.6 48L17.46 45.7592C17.4015 44.8245 17.1556 43.9112 16.7368 43.0735C16.2522 42.1045 16 41.036 16 39.9525V8.04747C16 6.96405 16.2522 5.8955 16.7368 4.92646C17.1556 4.08882 17.4015 3.17545 17.46 2.24077L17.6 0L17.74 2.24077C17.7985 3.17545 18.0444 4.08882 18.4632 4.92646ZM26.4632 4.92646C26.9478 5.8955 27.2 6.96405 27.2 8.04747V39.9525C27.2 41.036 26.9478 42.1045 26.4632 43.0735C26.0444 43.9112 25.7985 44.8245 25.74 45.7592L25.6 48L25.46 45.7592C25.4015 44.8245 25.1556 43.9112 24.7368 43.0735C24.2522 42.1045 24 41.036 24 39.9525V8.04747C24 6.96405 24.2522 5.8955 24.7368 4.92646C25.1556 4.08882 25.4015 3.17545 25.46 2.24077L25.6 0L25.74 2.24077C25.7985 3.17545 26.0444 4.08882 26.4632 4.92646ZM31.2 11.2475C31.2 10.1641 30.9478 9.09551 30.4632 8.12647C30.0444 7.28883 29.7985 6.37547 29.74 5.44078L29.6 3.20001L29.46 5.44078C29.4015 6.37547 29.1556 7.28883 28.7368 8.12647C28.2522 9.09551 28 10.1641 28 11.2475V36.7525C28 37.836 28.2522 38.9045 28.7368 39.8736C29.1556 40.7112 29.4015 41.6246 29.46 42.5592L29.6 44.8L29.74 42.5592C29.7985 41.6246 30.0444 40.7112 30.4632 39.8736C30.9478 38.9045 31.2 37.836 31.2 36.7525V11.2475ZM34.4632 11.3265C34.9478 12.2955 35.2 13.364 35.2 14.4475V33.5525C35.2 34.6359 34.9478 35.7045 34.4632 36.6735C34.0444 37.5112 33.7985 38.4245 33.74 39.3592L33.6 41.6L33.46 39.3592C33.4015 38.4245 33.1556 37.5112 32.7368 36.6735C32.2523 35.7045 32 34.6359 32 33.5525V14.4475C32 13.364 32.2523 12.2955 32.7368 11.3265C33.1556 10.4888 33.4015 9.57545 33.46 8.64076L33.6 6.39999L33.74 8.64076C33.7985 9.57545 34.0444 10.4888 34.4632 11.3265ZM39.2 20.8475C39.2 19.764 38.9478 18.6955 38.4632 17.7264C38.0444 16.8888 37.7985 15.9754 37.74 15.0408L37.6 12.8L37.46 15.0408C37.4015 15.9754 37.1556 16.8888 36.7368 17.7264C36.2523 18.6955 36 19.764 36 20.8475V27.1525C36 28.2359 36.2523 29.3045 36.7368 30.2735C37.1556 31.1112 37.4015 32.0245 37.46 32.9592L37.6 35.2L37.74 32.9592C37.7985 32.0245 38.0444 31.1112 38.4632 30.2735C38.9478 29.3045 39.2 28.2359 39.2 27.1525V20.8475ZM43.1998 24C43.1999 24.0158 43.2 24.0316 43.2 24.0475V23.9525C43.2 23.9684 43.1999 23.9842 43.1998 24ZM40.0002 24C40.0074 25.0672 40.2593 26.1187 40.7368 27.0735C41.1556 27.9112 41.4015 28.8245 41.46 29.7592L41.6 32L41.74 29.7592C41.7985 28.8245 42.0444 27.9112 42.4632 27.0735C42.9407 26.1187 43.1926 25.0672 43.1998 24C43.1926 22.9328 42.9407 21.8813 42.4632 20.9265C42.0444 20.0888 41.7985 19.1755 41.74 18.2408L41.6 16L41.46 18.2408C41.4015 19.1755 41.1556 20.0888 40.7368 20.9265C40.2593 21.8813 40.0074 22.9328 40.0002 24ZM40.0002 24C40.0001 23.9842 40 23.9684 40 23.9525V24.0475C40 24.0316 40.0001 24.0158 40.0002 24Z" class="ccustom" clip-rule="evenodd" fill="#ffffff80" fill-rule="evenodd"></path>
                     </svg>
                  </div>
                  <div class="ml-3">
                     <p class="text-white font-medium group-hover:text-gray-300 italic uppercase">Streamer</p>
                  </div>
               </div>
            </a>
            <button class="focus:outline-none focus:shadow-outline md:hidden rounded-lg" @click="open = !open">
               <svg fill="none" viewBox="0 0 24 24" class="h-8 w-8" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke-width="2" :class="{'hidden': open, 'inline-flex': !open }" class="inline-flex" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M6 18L18 6M6 6l12 12" stroke-width="2" :class="{'hidden': !open, 'inline-flex': open }" class="hidden" stroke-linecap="round" stroke-linejoin="round"></path>
               </svg>
            </button>
         </div>
         <nav class="items-center gap-3 flex-col flex-grow hidden lg:flex lg:flex-row lg:gap-6 lg:justify-start lg:mt-0 lg:p-0 lg:px-0 md:pb-0 opacity-100 p-4 px-5" :class="{'flex': open, 'hidden': !open}"><a href="/about" class="text-sm py-2 hover:text-white duration-200 ease-in-out focus:outline-none focus:shadow-none focus:text-white/5 lg:py-4 md:my-0 text-white/60 transform transition lg:ml-auto">About </a><a href="/contact" class="text-sm py-2 hover:text-white duration-200 ease-in-out focus:outline-none focus:shadow-none focus:text-white/5 lg:py-4 md:my-0 text-white/60 transform transition">Contact </a><a href="https://lexingtonthemes.lemonsqueezy.com/checkout/buy/f50206e4-c120-45bd-aa1e-22681509cdd4" class="items-center flex text-white gap-3 relative duration-200 hover:text-white text-sm"><span>Demo - Download for free &nbsp; →</span></a></nav>
      </div>
   </div>
   <section class="bg-black overflow-hidden">
      <section class="items-center px-8 mx-auto bg-black border border-white border-y-0 lg:px-24 lg:py-16 max-w-7xl py-36">
         <div class="flex flex-col w-full h-full" x-data="{
            skip: 1,
            atBeginning: false,
            atEnd: false,
            next() {
            this.to((current, offset) => current + (offset * this.skip))
            },
            prev() {
            this.to((current, offset) => current - (offset * this.skip))
            },
            to(strategy) {
            let slider = this.$refs.slider
            let current = slider.scrollLeft
            let offset = slider.firstElementChild.getBoundingClientRect().width
            slider.scrollTo({ left: strategy(current, offset), behavior: 'smooth' })
            },
            focusableWhenVisible: {
            'x-intersect:enter'() {
            this.$el.removeAttribute('tabindex')
            },
            'x-intersect:leave'() {
            this.$el.setAttribute('tabindex', '-1')
            },
            },
            disableNextAndPreviousButtons: {
            'x-intersect:enter.threshold.05'() {
            let slideEls = this.$el.parentElement.children
            // If this is the first slide.
            if (slideEls[0] === this.$el) {
            this.atBeginning = true
            // If this is the last slide.
            } else if (slideEls[slideEls.length-1] === this.$el) {
            this.atEnd = true
            }
            },
            'x-intersect:leave.threshold.05'() {
            let slideEls = this.$el.parentElement.children
            // If this is the first slide.
            if (slideEls[0] === this.$el) {
            this.atBeginning = false
            // If this is the last slide.
            } else if (slideEls[slideEls.length-1] === this.$el) {
            this.atEnd = false
            }
            },
            },
            }">
            <div class="items-center flex relative max-h-[50vh] mx-auto" aria-labelledby="carousel-label" role="region" tabindex="0" x-on:keydown.left="prev" x-on:keydown.right="next">
               <h2 class="sr-only" hidden="" id="carousel-label">Carousel</h2>
               <span class="sr-only" hidden="" id="carousel-content-label">Carousel</span>
               <div>
                  <ul aria-labelledby="carousel-content-label" class="items-center flex h-full w-full overflow-x-hidden py-6 snap-mandatory snap-x" role="listbox" tabindex="0" x-ref="slider">
                     <li class="items-center flex h-full w-full flex-col justify-center lg:w-full shrink-0 snap-start" role="option" x-bind="disableNextAndPreviousButtons">
                        <section>
                           <div class="items-center px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:max-w-6xl">
                              <div>
                                 <div>
                                    <div class="max-w-xl lg:pr-24 lg:text-left text-center">
                                       <span class="text-white 500 text-xs">Featured</span>
                                       <h2 class="text-white font-display font-semibold lg:text-6xl mt-6 text-3xl">Michael Delaware</h2>
                                       <p class="mt-5 text-zinc-400">We're joined by Michael Delaware, a multi-award-winning Creative Front-end Developer, and Founding Partner of Nada</p>
                                       <div class="flex justify-center flex-wrap lg:justify-start mt-6">
                                          <a href="" class="items-center flex text-white gap-3 relative text-white/90">
                                             Listen now 
                                             <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_837_5665)">
                                                   <line stroke="white" stroke-linecap="square" x1="0.5" x2="23.5" y1="11.5" y2="11.5"></line>
                                                   <mask fill="white" id="path-2-inside-1_837_5665">
                                                      <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z"></path>
                                                   </mask>
                                                   <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z" stroke="white" mask="url(#path-2-inside-1_837_5665)" stroke-width="8"></path>
                                                   <mask fill="white" id="path-3-inside-2_837_5665">
                                                      <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z"></path>
                                                   </mask>
                                                   <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z" stroke="white" mask="url(#path-3-inside-2_837_5665)" stroke-width="8"></path>
                                                </g>
                                                <defs>
                                                   <clipPath id="clip0_837_5665">
                                                      <rect fill="white" height="9" transform="translate(0 7)" width="24"></rect>
                                                   </clipPath>
                                                </defs>
                                             </svg>
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="max-w-xl aspect-square"><img alt="" src="https://images.unsplash.com/photo-1450133064473-71024230f91b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80"></div>
                           </div>
                        </section>
                        <button class="text-sm py-2 hidden px-4" x-bind="focusableWhenVisible">Do Something</button>
                     </li>
                     <li class="items-center flex h-full w-full flex-col justify-center lg:w-full shrink-0 snap-start" role="option" x-bind="disableNextAndPreviousButtons">
                        <section>
                           <div class="items-center px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:max-w-6xl 2xl:max-w-7xl">
                              <div>
                                 <div>
                                    <div class="max-w-xl lg:pr-24 lg:text-left text-center">
                                       <span class="text-white 500 text-xs">Featured</span>
                                       <h2 class="text-white font-display font-semibold lg:text-6xl mt-6 text-3xl">Juan Echanove</h2>
                                       <p class="mt-5 text-zinc-400">Streamer is a minimal template for podcasters and creators to share what they have been working on in a stunning way.</p>
                                       <div class="flex justify-center flex-wrap lg:justify-start mt-6">
                                          <a href="" class="items-center flex text-white gap-3 relative text-white/90">
                                             Listen now 
                                             <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_837_5665)">
                                                   <line stroke="white" stroke-linecap="square" x1="0.5" x2="23.5" y1="11.5" y2="11.5"></line>
                                                   <mask fill="white" id="path-2-inside-1_837_5665">
                                                      <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z"></path>
                                                   </mask>
                                                   <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z" stroke="white" mask="url(#path-2-inside-1_837_5665)" stroke-width="8"></path>
                                                   <mask fill="white" id="path-3-inside-2_837_5665">
                                                      <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z"></path>
                                                   </mask>
                                                   <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z" stroke="white" mask="url(#path-3-inside-2_837_5665)" stroke-width="8"></path>
                                                </g>
                                                <defs>
                                                   <clipPath id="clip0_837_5665">
                                                      <rect fill="white" height="9" transform="translate(0 7)" width="24"></rect>
                                                   </clipPath>
                                                </defs>
                                             </svg>
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="max-w-xl aspect-square"><img alt="" src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80"></div>
                           </div>
                        </section>
                        <button class="text-sm py-2 hidden px-4" x-bind="focusableWhenVisible">Do Something</button>
                     </li>
                     <li class="items-center flex h-full w-full flex-col justify-center lg:w-full shrink-0 snap-start" role="option" x-bind="disableNextAndPreviousButtons">
                        <section>
                           <div class="items-center px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:max-w-6xl 2xl:max-w-7xl">
                              <div>
                                 <div>
                                    <div class="max-w-xl lg:pr-24 lg:text-left text-center">
                                       <span class="text-white 500 text-xs">Featured</span>
                                       <h2 class="text-white font-display font-semibold lg:text-6xl mt-6 text-3xl">Helena Manera</h2>
                                       <p class="mt-5 text-zinc-400">Streamer is a minimal template for podcasters and creators to share what they have been working on in a stunning way.</p>
                                       <div class="flex justify-center flex-wrap lg:justify-start mt-6">
                                          <a href="" class="items-center flex text-white gap-3 relative text-white/90">
                                             Listen now 
                                             <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_837_5665)">
                                                   <line stroke="white" stroke-linecap="square" x1="0.5" x2="23.5" y1="11.5" y2="11.5"></line>
                                                   <mask fill="white" id="path-2-inside-1_837_5665">
                                                      <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z"></path>
                                                   </mask>
                                                   <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z" stroke="white" mask="url(#path-2-inside-1_837_5665)" stroke-width="8"></path>
                                                   <mask fill="white" id="path-3-inside-2_837_5665">
                                                      <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z"></path>
                                                   </mask>
                                                   <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z" stroke="white" mask="url(#path-3-inside-2_837_5665)" stroke-width="8"></path>
                                                </g>
                                                <defs>
                                                   <clipPath id="clip0_837_5665">
                                                      <rect fill="white" height="9" transform="translate(0 7)" width="24"></rect>
                                                   </clipPath>
                                                </defs>
                                             </svg>
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="max-w-xl aspect-square"><img alt="" src="https://images.unsplash.com/photo-1541911087797-f89237bd95d0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"></div>
                           </div>
                        </section>
                        <button class="text-sm py-2 hidden px-4" x-bind="focusableWhenVisible">Do Something</button>
                     </li>
                     <li class="items-center flex h-full w-full flex-col justify-center lg:w-full shrink-0 snap-start" role="option" x-bind="disableNextAndPreviousButtons">
                        <section>
                           <div class="items-center px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:max-w-6xl 2xl:max-w-7xl">
                              <div>
                                 <div>
                                    <div class="max-w-xl lg:pr-24 lg:text-left text-center">
                                       <span class="text-white 500 text-xs">Featured</span>
                                       <h2 class="text-white font-display font-semibold lg:text-6xl mt-6 text-3xl">Francisco Pereira</h2>
                                       <p class="mt-5 text-zinc-400">Streamer is a minimal template for podcasters and creators to share what they have been working on in a stunning way.</p>
                                       <div class="flex justify-center flex-wrap lg:justify-start mt-6">
                                          <a href="" class="items-center flex text-white gap-3 relative text-white/90">
                                             Listen now 
                                             <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_837_5665)">
                                                   <line stroke="white" stroke-linecap="square" x1="0.5" x2="23.5" y1="11.5" y2="11.5"></line>
                                                   <mask fill="white" id="path-2-inside-1_837_5665">
                                                      <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z"></path>
                                                   </mask>
                                                   <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z" stroke="white" mask="url(#path-2-inside-1_837_5665)" stroke-width="8"></path>
                                                   <mask fill="white" id="path-3-inside-2_837_5665">
                                                      <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z"></path>
                                                   </mask>
                                                   <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z" stroke="white" mask="url(#path-3-inside-2_837_5665)" stroke-width="8"></path>
                                                </g>
                                                <defs>
                                                   <clipPath id="clip0_837_5665">
                                                      <rect fill="white" height="9" transform="translate(0 7)" width="24"></rect>
                                                   </clipPath>
                                                </defs>
                                             </svg>
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="max-w-xl aspect-square"><img alt="" src="https://images.unsplash.com/photo-1520078452277-0832598937e5?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"></div>
                           </div>
                        </section>
                        <button class="text-sm py-2 hidden px-4" x-bind="focusableWhenVisible">Do Something</button>
                     </li>
                     <li class="items-center flex h-full w-full flex-col justify-center lg:w-full shrink-0 snap-start" role="option" x-bind="disableNextAndPreviousButtons">
                        <section>
                           <div class="items-center px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:max-w-6xl 2xl:max-w-7xl">
                              <div>
                                 <div>
                                    <div class="max-w-xl lg:pr-24 lg:text-left text-center">
                                       <span class="text-white 500 text-xs">Featured</span>
                                       <h2 class="text-white font-display font-semibold lg:text-6xl mt-6 text-3xl">Sven Svensson</h2>
                                       <p class="mt-5 text-zinc-400">Streamer is a minimal template for podcasters and creators to share what they have been working on in a stunning way.</p>
                                       <div class="flex justify-center flex-wrap lg:justify-start mt-6">
                                          <a href="" class="items-center flex text-white gap-3 relative text-white/90">
                                             Listen now 
                                             <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_837_5665)">
                                                   <line stroke="white" stroke-linecap="square" x1="0.5" x2="23.5" y1="11.5" y2="11.5"></line>
                                                   <mask fill="white" id="path-2-inside-1_837_5665">
                                                      <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z"></path>
                                                   </mask>
                                                   <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z" stroke="white" mask="url(#path-2-inside-1_837_5665)" stroke-width="8"></path>
                                                   <mask fill="white" id="path-3-inside-2_837_5665">
                                                      <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z"></path>
                                                   </mask>
                                                   <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z" stroke="white" mask="url(#path-3-inside-2_837_5665)" stroke-width="8"></path>
                                                </g>
                                                <defs>
                                                   <clipPath id="clip0_837_5665">
                                                      <rect fill="white" height="9" transform="translate(0 7)" width="24"></rect>
                                                   </clipPath>
                                                </defs>
                                             </svg>
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="max-w-xl aspect-square"><img alt="" src="https://images.unsplash.com/photo-1525227661914-3ed79b83624e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"></div>
                           </div>
                        </section>
                        <button class="text-sm py-2 hidden px-4" x-bind="focusableWhenVisible">Do Something</button>
                     </li>
                     <li class="items-center flex h-full w-full flex-col justify-center lg:w-full shrink-0 snap-start" role="option" x-bind="disableNextAndPreviousButtons">
                        <section>
                           <div class="items-center px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 lg:max-w-6xl 2xl:max-w-7xl">
                              <div>
                                 <div>
                                    <div class="max-w-xl lg:pr-24 lg:text-left text-center">
                                       <span class="text-white 500 text-xs">Featured</span>
                                       <h2 class="text-white font-display font-semibold lg:text-6xl mt-6 text-3xl">Fabio Assange</h2>
                                       <p class="mt-5 text-zinc-400">Streamer is a minimal template for podcasters and creators to share what they have been working on in a stunning way.</p>
                                       <div class="flex justify-center flex-wrap lg:justify-start mt-6">
                                          <a href="" class="items-center flex text-white gap-3 relative text-white/90">
                                             Listen now 
                                             <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_837_5665)">
                                                   <line stroke="white" stroke-linecap="square" x1="0.5" x2="23.5" y1="11.5" y2="11.5"></line>
                                                   <mask fill="white" id="path-2-inside-1_837_5665">
                                                      <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z"></path>
                                                   </mask>
                                                   <path d="M24 12C20.8174 12 17.7652 10.7357 15.5147 8.48528L16.3239 7.67605C18.3598 9.71187 21.1209 10.8556 24 10.8556L24 12Z" stroke="white" mask="url(#path-2-inside-1_837_5665)" stroke-width="8"></path>
                                                   <mask fill="white" id="path-3-inside-2_837_5665">
                                                      <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z"></path>
                                                   </mask>
                                                   <path d="M24 11C20.8174 11 17.7652 12.2643 15.5147 14.5147L16.3243 15.3243C18.36 13.2886 21.1211 12.1449 24 12.1449L24 11Z" stroke="white" mask="url(#path-3-inside-2_837_5665)" stroke-width="8"></path>
                                                </g>
                                                <defs>
                                                   <clipPath id="clip0_837_5665">
                                                      <rect fill="white" height="9" transform="translate(0 7)" width="24"></rect>
                                                   </clipPath>
                                                </defs>
                                             </svg>
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="max-w-xl aspect-square"><img alt="" src="https://images.unsplash.com/photo-1519228172884-fba2696ae551?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"></div>
                           </div>
                        </section>
                        <button class="text-sm py-2 hidden px-4" x-bind="focusableWhenVisible">Do Something</button>
                     </li>
                  </ul>
               </div>
               <div class="items-center gap-3 absolute bottom-0 inline-flex justify-between lg:px-8 mx-auto w-full">
                  <button class="" :aria-disabled="atBeginning" :class="{ 'opacity-50 cursor-not-allowed': atBeginning }" :tabindex="atEnd ? -1 : 0" x-on:click="prev" tabindex="0">
                     <span class="text-white 500 500 hover:text-white 300 bg-black block border border-white focus:ring-white hover:border-white p-2 ring-1 ring-transparent rounded-full" aria-hidden="true">
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                           <path d="M0 0h24v24H0z" stroke="none" fill="none"></path>
                           <polyline points="15 6 9 12 15 18"></polyline>
                        </svg>
                     </span>
                     <span class="sr-only">Skip to previous slide page</span>
                  </button>
                  <button class="" :aria-disabled="atEnd" :class="{ 'opacity-50 cursor-not-allowed': atEnd }" :tabindex="atEnd ? -1 : 0" x-on:click="next" tabindex="0">
                     <span class="text-white 500 500 hover:text-white 300 bg-black block border border-white focus:ring-white hover:border-white p-2 ring-1 ring-transparent rounded-full" aria-hidden="true">
                        <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                           <path d="M0 0h24v24H0z" stroke="none" fill="none"></path>
                           <polyline points="9 6 15 12 9 18"></polyline>
                        </svg>
                     </span>
                     <span class="sr-only">Skip to next slide page</span>
                  </button>
               </div>
            </div>
         </div>
      </section>
   </section>
   <section class="bg-black">
      <div class="mx-auto px-8 max-w-7xl border-x bg-white border-black lg:px-24 py-12">
         <div class="flex relative justify-start"><span class="font-display bg-white font-black lg:text-9xl pr-3 text-4xl text-black tracking-tight"><span class="font-thin text-accent-400">✺</span> Episodes</span></div>
      </div>
   </section>
   <section class="bg-black border-b border-white">
      <div class="mx-auto max-w-7xl border-white border-x">
         <div class="mx-auto divide-white divide-y">
            <a href="/episode-one" class="cursor-pointer">
               <article aria-labelledby="episode-1-title" class="items-center px-8 lg:px-24 group hover:bg-white py-12">
                  <div class="items-center flex sm:items-start">
                     <div class="flex-shrink-0 b h-20 overflow-hidden sm:h-40 sm:w-40 w-20"><img alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." src="https://images.unsplash.com/photo-1450133064473-71024230f91b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80" class="grayscale h-full object-center object-cover w-full"></div>
                     <div class="text-sm flex-1 ml-6">
                        <div class="font-medium sm:flex text-gray-900">
                           <div>
                              <h5><time class="group-hover:text-black leading-7 order-first text-xs text-zinc-500" datetime="2022-02-24T00:00:00.000Z">February 24, 2022</time></h5>
                              <h2 class="text-white font-display font-semibold group-hover:text-black lg:text-2xl mt-2 text-lg tracking-widest"><span class="font-mono">01</span>: Michael Delaware</h2>
                           </div>
                        </div>
                        <div>
                           <p class="group-hover:text-black font-light lg:text-lg line-clamp-1 md:line-clamp-2 mt-1 text-white/60">There are many differences between the public and private sectors. What is it like for engineering roles? In this episode, we are joined by Jasmine Robinson from Netflix to hear about her experience moving from the public sector to a corporate career.There are many differences between the public and private sectors. What is it like for engineering roles? In this episode, we are joined by Jasmine Robinson from Netflix to hear about her experience moving from the public sector to a corporate career.</p>
                        </div>
                     </div>
                  </div>
               </article>
            </a>
            <a href="/episode-one">
               <article aria-labelledby="episode-1-title" class="items-center px-8 lg:px-24 group hover:bg-white py-12">
                  <div class="items-center flex sm:items-start">
                     <div class="flex-shrink-0 b h-20 overflow-hidden sm:h-40 sm:w-40 w-20"><img alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80" class="grayscale h-full object-center object-cover w-full"></div>
                     <div class="text-sm flex-1 ml-6">
                        <div class="font-medium sm:flex text-gray-900">
                           <div>
                              <h5><time class="group-hover:text-black leading-7 order-first text-xs text-zinc-500" datetime="2022-02-24T00:00:00.000Z">January 15, 2022</time></h5>
                              <h2 class="text-white font-display font-semibold group-hover:text-black lg:text-2xl mt-2 text-lg tracking-widest"><span class="font-mono">02</span>: Julia Smithozonovos</h2>
                           </div>
                        </div>
                        <div>
                           <p class="group-hover:text-black font-light lg:text-lg line-clamp-1 md:line-clamp-2 mt-1 text-white/60">Our sidebar interview specials interview our panelists individually to learn more about their backgrounds and careers. In this episode, we interview Brian Holt, to learn more about his background and career.</p>
                        </div>
                     </div>
                  </div>
               </article>
            </a>
            <a href="/episode-one">
               <article aria-labelledby="episode-1-title" class="items-center px-8 lg:px-24 group hover:bg-white py-12">
                  <div class="items-center flex sm:items-start">
                     <div class="flex-shrink-0 b h-20 overflow-hidden sm:h-40 sm:w-40 w-20"><img alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80" class="grayscale h-full object-center object-cover w-full"></div>
                     <div class="text-sm flex-1 ml-6">
                        <div class="font-medium sm:flex text-gray-900">
                           <div>
                              <h5><time class="group-hover:text-black leading-7 order-first text-xs text-zinc-500" datetime="2022-02-24T00:00:00.000Z">December 01, 2021</time></h5>
                              <h2 class="text-white font-display font-semibold group-hover:text-black lg:text-2xl mt-2 text-lg tracking-widest"><span class="font-mono">03</span>: Juan Echanove</h2>
                           </div>
                        </div>
                        <div>
                           <p class="group-hover:text-black font-light lg:text-lg line-clamp-1 md:line-clamp-2 mt-1 text-white/60">With this ever-changing landscape of technologies, we spend this episode talking with Rhian van Esch and Carlos Castro about the current trends of web development in 2022.</p>
                        </div>
                     </div>
                  </div>
               </article>
            </a>
            <a href="/episode-one">
               <article aria-labelledby="episode-1-title" class="items-center px-8 lg:px-24 group hover:bg-white py-12">
                  <div class="items-center flex sm:items-start">
                     <div class="flex-shrink-0 b h-20 overflow-hidden sm:h-40 sm:w-40 w-20"><img alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." src="https://images.unsplash.com/photo-1506956191951-7a88da4435e5?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1674&amp;q=80" class="grayscale h-full object-center object-cover w-full"></div>
                     <div class="text-sm flex-1 ml-6">
                        <div class="font-medium sm:flex text-gray-900">
                           <div>
                              <h5><time class="group-hover:text-black leading-7 order-first text-xs text-zinc-500" datetime="2022-02-24T00:00:00.000Z">December 01, 2021</time></h5>
                              <h2 class="text-white font-display font-semibold group-hover:text-black lg:text-2xl mt-2 text-lg tracking-widest"><span class="font-mono">04</span>:Maripaz Diaz</h2>
                           </div>
                        </div>
                        <div>
                           <p class="group-hover:text-black font-light lg:text-lg line-clamp-1 md:line-clamp-2 mt-1 text-white/60">With this ever-changing landscape of technologies, we spend this episode talking with Rhian van Esch and Carlos Castro about the current trends of web development in 2022.</p>
                        </div>
                     </div>
                  </div>
               </article>
            </a>
         </div>
      </div>
   </section>
   <section class="bg-black" aria-labelledby="footer-heading" id="footer">
      <footer>
         <div class="mx-auto max-w-7xl border-white divide-white divide-y lg:border-x">
            <div class="flex flex-col lg:flex-row lg:items-center px-8 gap-y-12 items-start justify-between lg:px-24 lg:py-16 pb-6 pt-16">
               <div class="lg:mx-auto lg:text-center">
                  <div class="items-center flex text-white">
                     <div class="lg:mx-auto lg:text-center">
                        <p class="font-display font-semibold italic lg:mx-auto lg:text-4xl text-2xl">streamer.</p>
                        <p class="text-sm mt-1">Designed and built in the Åland Islands<br>by Michael Andreuzza.</p>
                     </div>
                  </div>
                  <nav class="flex flex-col lg:flex-row gap-8 mt-11"><a href="https://lexingtonthemes.com/license.html" class="text-white 500 hover:text-white -mx-3 -my-2 delay-150 px-3 py-2 relative rounded-lg text-sm transition-colors"><span class="z-10 relative">License</span> </a><a href="https://lexingtonthemes.com/faq.html" class="text-white 500 hover:text-white -mx-3 -my-2 delay-150 px-3 py-2 relative rounded-lg text-sm transition-colors"><span class="z-10 relative">Faq</span> </a><a href="https://lexingtonthemes.com" class="text-white 500 hover:text-white -mx-3 -my-2 delay-150 px-3 py-2 relative rounded-lg text-sm transition-colors"><span class="z-10 relative">Lexington</span> </a><a href="https://twitter.com/Mike_Andreuzza" class="text-white 500 hover:text-white -mx-3 -my-2 delay-150 px-3 py-2 relative rounded-lg text-sm transition-colors"><span class="z-10 relative">Social</span></a></nav>
               </div>
            </div>
            <div class="flex flex-col lg:px-24 px-8 lg:mx-auto lg:text-center md:pt-6 pb-12 pt-8">
               <p class="text-sm md:mt-0 mt-6 text-zinc-500">© Copyright 2022 . All rights reserved.</p>
            </div>
         </div>
      </footer>
   </section>
</div>
`

const style = `
`



const metadata = {
   image: 'https://bafybeifby4a2dlftlfyxl6ymsipder44d5mswgd3sonbgyn2jctjddvb7e.ipfs.w3s.link/Streamer.png',
   preview: 'https://bafybeidwdpgeks3rlrhvv5yxtbc3xaxbkv2n35fphbdnaekfjumfllceme.ipfs.w3s.link/StreamerPreview.png',
   name: 'Streamer',
   description: 'template.streamer',
   tags: ['Landing Page'],
   premium: false
}


export { template, style, metadata }