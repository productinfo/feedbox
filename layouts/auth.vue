<template>
  <main>
    <div class="d-flex align-items-center position-relative min-height-100vh--lg">
      <header class="header">
        <nav class="d-flex justify-content-between align-items-center">
          <div class="col-lg-5 col-xl-4 text-lg-center px-0">
            <a class="d-inline-block p-3 p-sm-5" href="/" aria-label="Feedbox">
              <span class="d-none d-lg-inline-block logopage logopage--white">Feedbox</span>
              <span class="d-inline-block d-lg-none logopage logopage--black">Feedbox</span>
            </a>
          </div>
        </nav>
      </header>
      <div class="col-lg-5 col-xl-4 d-none d-lg-flex align-items-center min-height-100vh--lg px-0 half-gradient">
        <div class="w-100 p-5">
          <figure class="mb-5 mx-auto quote-icon">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8 8" style="enable-background:new 0 0 8 8;" xml:space="preserve">
              <path class="u-fill-white" d="M3,1.3C2,1.7,1.2,2.7,1.2,3.6c0,0.2,0,0.4,0.1,0.5c0.2-0.2,0.5-0.3,0.9-0.3c0.8,0,1.5,0.6,1.5,1.5c0,0.9-0.7,1.5-1.5,1.5
                C1.4,6.9,1,6.6,0.7,6.1C0.4,5.6,0.3,4.9,0.3,4.5c0-1.6,0.8-2.9,2.5-3.7L3,1.3z M7.1,1.3c-1,0.4-1.8,1.4-1.8,2.3
                c0,0.2,0,0.4,0.1,0.5c0.2-0.2,0.5-0.3,0.9-0.3c0.8,0,1.5,0.6,1.5,1.5c0,0.9-0.7,1.5-1.5,1.5c-0.7,0-1.1-0.3-1.4-0.8
                C4.4,5.6,4.4,4.9,4.4,4.5c0-1.6,0.8-2.9,2.5-3.7L7.1,1.3z"></path>
            </svg>
          </figure>
          <div class="mb-4">
            <div class="text-center mx-auto">
              <blockquote class="h4 text-white mb-4">
                “Be kind whenever possible. It is always possible.”
                <footer class="blockquote-footer">
                  Dalai Lama
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row no-gutters">
          <nuxt/>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss">
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizelegibility;
  }

  body {
    color: #1e2022;
    font-family: "Poppins", Helvetica, Arial, sans-serif;
  }

  main {
    position: relative;
    overflow: hidden;
  }

  .logopage {
    font-size: 2em;
    font-weight: 900;
    text-transform: uppercase;
    font-family: 'Work Sans', sans-serif;
    letter-spacing: 1.5px;
  }

  .logopage--black {
    color: #000 !important;
  }

  .logopage--white {
     color: white !important;
  }

  .half-gradient {
   background-image: linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%);
   background-repeat: repeat-x;
  }

  @media (min-width: 992px) {
    .min-height-100vh--lg {
      height: 100vh;
    }

    .u-space-0--lg {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .header {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .mb-7 {
    margin-bottom: 3rem !important;
  }

  .form-control {
    height: calc(3rem + 2px);

    &:focus {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    font-weight: 500;
  }

  .u-link-muted {
    color: #8c98a4;
    border-bottom: 1px dashed #97a4af;
  }

  a {
    text-decoration: none;

    &:hover {
      color: #1164ff;
      text-decoration: none;
    }
  }

  .u-space-3 {
    padding-top: 6.125rem;
    padding-bottom: 6.125rem;
  }

  .quote-icon {
    width: 45px;
    svg path {
      fill: #fff;
    }
  }

  .blockquote-footer {
    color: #fff;
    border-top: 0;
  }

  .logo-text {
    font-weight: 900;
    text-transform: uppercase;
    font-family: 'Work Sans', sans-serif;
    letter-spacing: 1.5px;
  }
</style>