onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded")
    clearTimeout(c)
  }, 1000)

  let confettiAmount = 100,
    confettiColors = [
      "#7d32f5",
      "#f6e434",
      "#63fdf1",
      "#e672da",
      "#295dfe",
      "#6e57ff",
    ],
    random = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    createConfetti = (to) => {
      let elem = document.createElement("i"),
        set = Math.random() < 0.5 ? -1 : 1
      elem.style.setProperty("--x", random(-360, 360) + "px")
      elem.style.setProperty("--y", random(-200, 200) + "px")
      elem.style.setProperty("--r", random(0, 360) + "deg")
      elem.style.setProperty("--s", random(0.6, 1).toString())
      elem.style.setProperty("--b", confettiColors[random(0, 5)])
      to.appendChild(elem)
    }

  document.querySelectorAll(".button").forEach((button) => {
    let complete = false,
      timeline = gsap.timeline({
        paused: true,
        ease: "none",
        onComplete() {
          complete = true
          button.classList.add("complete")
          for (let i = 0; i < confettiAmount; i++) {
            createConfetti(button)
          }
          setTimeout(() => {
            button.classList.add("confetti")
            setTimeout(
              () => button.querySelectorAll("i").forEach((i) => i.remove()),
              600
            )
          }, 300)
          // Reset
          setTimeout(() => {
            button.classList.remove("complete", "confetti")
            complete = false
            document.getElementsByClassName("container-1")[0].style.display =
              "none"
            document.getElementsByClassName("container-2")[0].style.display =
              "block"
            document.getElementById("typing-sound-2").play()
          }, 2000)
        },
      }),
      up = 0

    timeline.to(button, {
      keyframes: [
        {
          "--weight-y": -6,
          "--arm-rotate-s-x": 90,
          duration: 0.3,
        },
        {
          "--weight-y": -10,
          "--arm-rotate-s-x": 45,
          "--arm-rotate-s": 130,
          duration: 0.2,
        },
        {
          "--weight-y": -12,
          "--arm-rotate-s": 130,
          "--arm-rotate-s-x": 0,
          duration: 0.1,
        },
        {
          "--weight-y": -20,
          "--person-y": -4,
          "--arm-rotate": 100,
          "--arm-rotate-s": 90,
          "--leg-y": 0,
          "--leg-rotate": 20,
          "--leg-rotate-s": -20,
          duration: 0.2,
        },
        {
          "--weight-y": -25,
          "--arm-rotate": 150,
          "--arm-rotate-s": 30,
          duration: 0.2,
        },
      ],
    })

    button.addEventListener("click", (e) => {
      up = 1

      const rippleDiv = document.createElement("div")

      rippleDiv.className = "ripple"

      const boundingClientRect = button.getBoundingClientRect()

      button.style.setProperty(
        "--ripple-x",
        e.clientX - boundingClientRect.left
      )
      button.style.setProperty("--ripple-y", e.clientY - boundingClientRect.top)

      button.querySelector(".inner").appendChild(rippleDiv)

      setTimeout(() => rippleDiv.remove(), 500)
    })

    setInterval(() => {
      up = up > 0 ? up - 0.1 : 0

      let progress = timeline.progress(),
        direction = up > 0 ? 1 : -1.5

      if (!complete) {
        timeline.progress(progress + 0.01 * direction)
      }
    }, 1000 / 60)
  })
}

// Nội dung cần hiển thị
const text = `Hé lu chị nhen, lâu rùi hong gặp dạo này chị khỏe chứ nhò? Chắc mọi chuyện đều ổn ha. Năm nay sinh nhật xa nhà nữa rùi, mà thấy chị đăng ảnh đồ cũng zui nên hk sao nhỉ. Em nghỉ mấy này nhằm nhò gì với chị đâu đúng hong kkk. Hoy nói chứ, ở xa cũng chắc hơi bùn nên chị đừng buồn nữa nhe 🙊. 

Tuổi mới chúc chị luôn zui zẻ, xinh đẹp và gặt hái thêm nhìu mong muốn của mình nhen 🎉🎉🎉. Chúc chị sớm tốt nghiệp, và có được một công việc mình mong muốn hen 🎈🎈🎈. 

Ký gửi 
Bé Long không công nghiệp`

// Thời gian chờ giữa mỗi chữ
const typingSpeed = 20 // 50ms

let index = 0

function typeText() {
  const typingElement = document.getElementById("typing-text")

  // Thêm từng ký tự vào phần tử
  if (index < text.length && typingElement) {
    typingElement.innerHTML += text.charAt(index)
    index++
    setTimeout(typeText, typingSpeed)
  } else {
    setTimeout(showButton, 100)
    document.getElementById("typing-sound-1").pause()
  }
}

function showButton() {
  const s = document.getElementsByClassName("c-btn")
  if (s.length > 0) s[0].style.display = "block"
}

function handleButtonClick() {
  const s1 = document.getElementById("step-1-1")
  const s2 = document.getElementById("step-1-2")

  if (s1) s1.className = "slit-out-horizontal"
  setTimeout(() => {
    if (s2) {
      s2.style.display = "block"
      s2.className = "slit-in-horizontal"
    }
  }, 1000)
}

document.getElementsByClassName("btn-2")[0].addEventListener("click", () => {
  const button = document.querySelector(".c-btn .btn-next")
  if (button) {
    button.addEventListener("click", () => {
      handleButtonClick()
    })
  }
  // Bắt đầu hiệu ứng gõ chữ
  document.getElementById("typing-sound-1").play()
  typeText()
  document.getElementsByClassName("btn-2")[0].style.display = "none"
})
