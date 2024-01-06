const template = `
<div data-new-gr-c-s-check-loaded="14.1106.0" data-gr-ext-installed="" cz-shortcut-listen="true">
        
        <section class="py-16">

            <div class="container max-w-screen-xl mx-auto px-4">

                <nav class="flex-wrap lg:flex items-center justify-between mb-24 xl:mb-48" x-data="{navbarOpen:false}">
                    <div class="flex items-center mb-10 lg:mb-0">
                        <img src="https://elegant-goodies.co/preview/Ditch/assets/image/navbar-logo.svg" alt="Logo">

                        <button class="w-10 h-10 lg:hidden ml-auto flex items-center justify-center text-indigo-800 border border-indigo-800 rounded-md" @click="navbarOpen = !navbarOpen">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>

                    <ul class="lg:flex flex-col lg:flex-row lg:items-center lg:space-x-20 mb-10 xl:mb-0 hidden" :class="{'hidden':!navbarOpen,'flex':navbarOpen}">
                        <li class="font-medium text-gray-500 text-lg hover:text-gray-400 transiton ease-in-out duration-300 mb-5 lg:mb-0">
                            <a href="#">Services</a>
                        </li>
                        <li class="font-medium text-gray-500 text-lg hover:text-gray-400 transiton ease-in-out duration-300 mb-5 lg:mb-0">
                            <a href="#">Works</a>
                        </li>
                        <li class="font-medium text-gray-500 text-lg hover:text-gray-400 transiton ease-in-out duration-300 mb-5 lg:mb-0">
                            <a href="#">Blog</a>
                        </li>
                        <li class="px-8 py-3 font-medium text-indigo-800 text-lg text-center border-2 border-indigo-800 rounded-md hover:bg-indigo-800 hover:text-white transiton ease-linear duration-300">
                            <a href="#">Hire me</a>
                        </li>
                    </ul>
                </nav>

                <header class="flex flex-col lg:flex-row justify-between lg:mb-20">
                    <div class="text-center lg:text-left mb-20 lg:mb-0">
                        <div class="flex items-center justify-center lg:justify-start gap-2 mb-10">
                            <span class="w-20 h-1 bg-indigo-700"></span>

                            <p class="font-medium text-indigo-700 text-xl">Jessica Strosin</p>
                        </div>

                        <h1 class="font-bold text-gray-800 text-4xl md:text-6xl xl:text-7xl mb-10">Creative thinker <br> Minimalism lover</h1>

                        <p class="font-normal text-gray-500 text-sm md:text-md xl:text-lg mb-10">Hi, I’m Jessica. I’m UI/UX Designer. If you are looking for Designer <br> to build your brands and grow your business Let’s shake hands <br> with me.</p>

                        <div class="space-y-5 lg:space-x-5 mb-10">
                            <a href="#" class="block md:inline px-8 py-3 font-medium bg-indigo-800 text-white text-lg rounded-md hover:bg-indigo-600 transiton ease-in-out duration-300">Hire me</a>
                            
                            <a href="#" class="block md:inline px-8 py-3 font-medium text-indigo-800 text-lg border-2 border-indigo-800 rounded-md hover:bg-indigo-600 hover:text-white transiton ease-linear duration-300">Read more</a>
                        </div>

                        <hr class="text-gray-500 mb-5">

                        <span class="font-normal text-gray-500 text-sm">I am currently open for part-time work.</span>
                    </div>

                    <div class="mx-auto lg:mx-0">
                        <img src="https://elegant-goodies.co/preview/Ditch/assets/image/home-img.svg"alt="Image">
                    </div>
                </header>

            </div> <!-- container.// -->

        </section>

        <section class="py-16 lg:mb-20">

            <div class="container max-w-screen-xl mx-auto px-4">

                <h1 class="font-semibold text-gray-800 text-2xl md:text-3xl xl:text-5xl text-center leading-tight mb-20 xl:mb-40">From beginning ideas to individual integrity, <br> rich identity from the line <span class="text-indigo-800">on the paper to <br> final projects</span></h1>

                <div class="flex flex-col xl:flex-row gap-16">
                    <div class="mx-auto xl:mx-0">
                        <img src="https://elegant-goodies.co/preview/Ditch/assets/image/home-img-2.svg" alt="Image">
                    </div>

                    <div class="grid grid-cols-2 text-center xl:text-left xl:gap-x-24 mt-10">
                        <div class="mb-16 xl:mb-0">
                            <h4 class="font-semibold text-gray-800 text-md md:text-lg mb-5">Web design</h4>

                            <p class="font-normal text-gray-500 text-xs md:text-sm mb-5">Provide our customers with optimized user-friendly <br> experience to increase the efficiency of digital <br> products.</p>

                            <a href="#" class="flex items-center justify-center xl:justify-start gap-3 font-medium text-indigo-800 text-md hover:text-indigo-600 transition ease-in-out duration-300">
                                See Works
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>

                        <div class="mb-16 xl:mb-0">
                            <h4 class="font-semibold text-gray-800 text-md md:text-lg mb-5">Mobile design</h4>

                            <p class="font-normal text-gray-500 text-xs md:text-sm mb-5">Mobile application development is a highlight that <br> businesses are interested in at the moment and in <br> the future.</p>

                            <a href="#" class="flex items-center justify-center xl:justify-start gap-3 font-medium text-indigo-800 text-md hover:text-indigo-600 transition ease-in-out duration-300">
                                See Works
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>

                        <div class="mb-16 xl:mb-0">
                            <h4 class="font-semibold text-gray-800 text-md md:text-lg mb-5">Branding</h4>

                            <p class="font-normal text-gray-500 text-xs md:text-sm mb-5">Understanding the business and their target <br> customers, I’m the bridges to bring the brand closer <br> to their clients.</p>

                            <a href="#" class="flex items-center justify-center xl:justify-start gap-3 font-medium text-indigo-800 text-md hover:text-indigo-600 transition ease-in-out duration-300">
                                See Works
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>

                        <div class="mb-16 xl:mb-0">
                            <h4 class="font-semibold text-gray-800 text-md md:text-lg mb-5">3D Modeling</h4>

                            <p class="font-normal text-gray-500 text-xs md:text-sm mb-5">Help you translate your existing design or concept <br> into CAD or to work with you to develop the ideal <br> design. 3D Models great for modern digital art</p>

                            <a href="#" class="flex items-center justify-center xl:justify-start gap-3 font-medium text-indigo-800 text-md hover:text-indigo-600 transition ease-in-out duration-300">
                                See Works
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>

                        <div>
                            <h4 class="font-semibold text-gray-800 text-md md:text-lg mb-5">Photography</h4>

                            <p class="font-normal text-gray-500 text-xs md:text-sm mb-5">While stock photography is a great option for <br> sourcing high-quality photos, it’s important that you <br> choose your photos thoughtfully.</p>

                            <a href="#" class="flex items-center justify-center xl:justify-start gap-3 font-medium text-indigo-800 text-md hover:text-indigo-600 transition ease-in-out duration-300">
                                See Works
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>

                        <div>
                            <h4 class="font-semibold text-gray-800 text-md md:text-lg mb-5">Video creating</h4>

                            <p class="font-normal text-gray-500 text-xs md:text-sm mb-5">Create high-impact social videos with our easy <br> video maker. Use custom video templates to find <br> the right story for your business.</p>

                            <a href="#" class="flex items-center justify-center xl:justify-start gap-3 font-medium text-indigo-800 text-md hover:text-indigo-600 transition ease-in-out duration-300">
                                See Works
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>
                    </div>
                </div>

            </div> <!-- container.// -->

        </section>

        <section class="bg-red-50 py-16 lg:mb-20">

            <div class="container max-w-screen-xl mx-auto px-4">

                <p class="font-normal text-gray-400 text-xl text-center lg:text-left mb-5">Trusted by</p>

                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ml-16 md:ml-24 lg:ml-0">
                    <img src="https://elegant-goodies.co/preview/Ditch/assets/image/alfabet.svg" alt="Image" class="mb-5 md:mb-10 xl:mb-0">
                    
                    <img src="https://elegant-goodies.co/preview/Ditch/assets/image/shopify.svg" alt="Image" class="mb-5 md:mb-10 xl:mb-0">
                    
                    <img src="https://elegant-goodies.co/preview/Ditch/assets/image/amazon.svg" alt="Image" class="mb-5 md:mb-0">
                    
                    <img src="https://elegant-goodies.co/preview/Ditch/assets/image/google.svg" alt="Image" class="mb-5 md:mb-0">
                    
                    <img src="https://elegant-goodies.co/preview/Ditch/assets/image/netflix.svg" alt="Image" class="mb-5 md:mb-0">
                </div>

            </div> <!-- container.// -->

        </section>

        <section class="py-16">

            <div class="container max-w-screen-xl mx-auto px-4">

                <h1 class="font-semibold text-gray-800 text-center text-xl md:text-3xl xl:text-5xl leading-tight mb-10 md:mb-20 xl:mb-40">It’s great to always give the customer the <br> best feed.</h1>

                <div class="flex justify-center space-x-2 md:space-x-5 xl:space-x-8 mb-2 md:mb-5 xl:mb-8">
                    <div class="space-y-2 md:space-y-5 xl:space-y-8">
                        <img src="https://elegant-goodies.co/preview/Ditch/assets/image/image-1.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">

                        <img src="https://elegant-goodies.co/preview/Ditch/assets/image/image-3.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">
                    </div>

                    <div>
                        <img src="https://elegant-goodies.co/preview/Ditch/assets/image/image-2.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">
                    </div>
                </div>

                <div class="flex justify-center">
                    <img src="https://elegant-goodies.co/preview/Ditch/assets/image/image-4.svg" alt="Image" class="hover:opacity-75 transition ease-in-out duration-300">
                </div>

            </div> <!-- container.// -->

        </section>

        <section class="py-8 md:py-16">

            <div class="container max-w-screen-xl mx-auto px-4">

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    <div class="text-center mb-10 xl:mb-0">
                        <div class="flex items-center justify-center">
                            <div class="w-24 py-9 flex justify-center bg-indigo-50 text-indigo-500 rounded-md mb-5 md:mb-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            </div>
                        </div>

                        <h2 class="font-semibold text-gray-700 text-xl md:text-3xl mb-5">Business planning</h2>

                        <p class="font-normal text-gray-400 text-sm md:text-lg">Excepteur sint occaecat cupidatat non <br> proident, sunt in culpa qui officia deserunt <br> mollit anim id est laborum.</p>
                    </div>

                    <div class="text-center mb-10 md:mb-0">
                        <div class="flex items-center justify-center">
                            <div class="w-24 py-9 flex justify-center bg-indigo-50 text-indigo-500 rounded-md mb-5 md:mb-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                        </div>

                        <h2 class="font-semibold text-gray-700 text-xl md:text-3xl mb-5">Financial planning</h2>

                        <p class="font-normal text-gray-400 text-sm md:text-lg">Excepteur sint occaecat cupidatat non <br> proident, sunt in culpa qui officia deserunt <br> mollit anim id est laborum.</p>
                    </div>

                    <div class="text-center">
                        <div class="flex items-center justify-center">
                            <div class="w-24 py-9 flex justify-center bg-indigo-50 text-indigo-500 rounded-md mb-5 md:mb-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                        </div>

                        <h2 class="font-semibold text-gray-700 text-xl md:text-3xl mb-5">Market Analytics</h2>

                        <p class="font-normal text-gray-400 text-sm md:text-lg">Excepteur sint occaecat cupidatat non <br> proident, sunt in culpa qui officia deserunt <br> mollit anim id est laborum.</p>
                    </div>
                </div>

            </div> <!-- container.// -->

        </section>

        <section class="py-16 lg:mb-20">

            <div class="container max-w-screen-xl mx-auto px-4">

                <h1 class="font-semibold text-gray-800 text-5xl text-center mb-20 xl:mb-40">Careers</h1>

                <div class="flex flex-col md:flex-row text-center md:text-left md:justify-between">
                    <div class="space-y-8 md:space-y-16 mb-16 md:mb-0">
                        <h6 class="font-medium text-gray-500 text-base uppercase">Company</h6>

                        <p class="font-semibold text-gray-600 text-base">Massa Fames <span class="font-normal text-gray-400">/ New York</span></p>

                        <p class="font-semibold text-gray-600 text-base">Massa Fames <span class="font-normal text-gray-400">/ New York</span></p>

                        <p class="font-semibold text-gray-600 text-base">Massa Fames <span class="font-normal text-gray-400">/ New York</span></p>

                        <p class="font-semibold text-gray-600 text-base">Massa Fames <span class="font-normal text-gray-400">/ New York</span></p>

                        <p class="font-semibold text-gray-600 text-base">Massa Fames <span class="font-normal text-gray-400">/ New York</span></p>
                    </div>

                    <div class="space-y-8 md:space-y-16 mb-16 md:mb-0">
                        <h6 class="font-medium text-gray-500 text-base uppercase">Position</h6>

                        <p class="font-normal text-gray-500 text-base">Junior Front-End Developer</p>

                        <p class="font-normal text-gray-500 text-base">Junior Front-End Developer</p>

                        <p class="font-normal text-gray-500 text-base">Junior Front-End Developer</p>

                        <p class="font-normal text-gray-500 text-base">Junior Front-End Developer</p>

                        <p class="font-normal text-gray-500 text-base">Junior Front-End Developer</p>
                    </div>

                    <div class="space-y-8 md:space-y-16 mb-16 md:mb-0">
                        <h6 class="font-medium text-gray-500 text-base uppercase">Year</h6>

                        <p class="font-normal text-gray-500 text-base">2016</p>

                        <p class="font-normal text-gray-500 text-base">2016</p>

                        <p class="font-normal text-gray-500 text-base">2016</p>

                        <p class="font-normal text-gray-500 text-base">2016</p>

                        <p class="font-normal text-gray-500 text-base">2016</p>
                    </div>
                </div>
                
            </div>

        </section>

        <footer class="bg-red-50 py-16 mb-10">

            <div class="container max-w-screen-xl mx-auto px-4">

                <div class="text-center">
                    <h1 class="font-medium text-gray-700 text-2xl md:text-5xl mb-5">Contact with me</h1>

                    <p class="font-normal text-gray-400 text-sm md:text-lg mb-20">I’m not currently taking on new client work but feel free to contact me for any <br> other inquiries.</p>

                    <div class="flex items-center justify-center space-x-4 md:space-x-8">
                        <a href="#" class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter text-gray-500 hover:text-white transition ease-in-out duration-500"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        </a>
    
                        <a href="#" class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dribbble text-gray-500 hover:text-white transition ease-in-out duration-500"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>
                        </a>
    
                        <a href="#" class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook text-gray-500 hover:text-white transition ease-in-out duration-500"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
    
                        <a href="#" class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-codepen text-gray-500 hover:text-white transition ease-in-out duration-500"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line></svg>
                        </a>
    
                        <a href="#" class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign text-gray-500 hover:text-white transition ease-in-out duration-500"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
                        </a>
    
                        <a href="#" class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-red-200 transition ease-in-out duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram text-gray-500 hover:text-white transition ease-in-out duration-500"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                    </div>
                </div>

            </div>

        </footer>


        <script>
            feather.replace()
        </script>

    
</div>
`

const style = `

`
const metadata = {
   image: 'https://bafybeic4ojcfjgsjxgv24pyaf65pdz6ezmhsutrnqkuhjt3cnabxqzaxge.ipfs.w3s.link/Ditch.png',
   preview: 'https://bafybeiauc6xrnwiwhfir24p4quw3nxxqdh33cxwcsmx27k6bxchjg3aiba.ipfs.w3s.link/DitchPreview.png',
   name: 'Ditch',
   description: 'template.dockerz',
   tags: ['landing_page'],
   premium: false
}

export { template, style, metadata }