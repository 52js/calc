window.onload = function () {
  const [official, calculate, copyEvery, copyResult, clear, result, Copyright] =
    [
      document.querySelector('.input'),
      document.querySelector('#calculate'),
      document.querySelector('#copyEvery'),
      document.querySelector('#copyResult'),
      document.querySelector('#clear'),
      document.querySelector('p'),
      document.querySelector('#Copyright'),
    ]

  official.textContent = atob(localStorage.equation ?? '')
  /* 计算 */
  calculate.addEventListener('click', function () {
    if (official.textContent.length != 0) {
      try {
        calculationResults = eval(
          official.textContent
            .replace(/\/-/gm, '(')
            .replace(/-\//gm, ')')
            .replace(/×/gm, '*')
            .replace(/÷/gm, '/')
            .replace(/（/gm, '(')
            .replace(/）/gm, ')')
            .replace(/[，,。]/gm, '.')
            .replace(/=(\n+)?([0-9.\n]+)?/gm, '')
        )

        official.textContent = official.textContent
          .replace(/\/-/gm, '(')
          .replace(/-\//gm, ')')
          .replace(/\*/gm, '×')
          .replace(/\//gm, '÷')
          .replace(/（/gm, '(')
          .replace(/）/gm, ')')
          .replace(/[，,。]/gm, '.')
          .replace(/\s+/gm, '')
          .replace(/=(\n+)?([0-9.\n]+)?/gm, '')
        result.textContent = `计算结果为：${calculationResults}`
      } catch (error) {
        result.textContent = '算式输入错误，请重新输入'
      }
      
      localStorage.equation = btoa(official.textContent)
    }
  })

  // 点击复制算式和答案
  copyEvery.addEventListener('click', function () {
    var textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'absolute'
    textarea.style.clip = 'rect(0 0 0 0)'
    // 赋值
    textarea.textContent = `${official.textContent}=${calculationResults}`
    // 选中
    textarea.select()
    // 复制
    document.execCommand('copy', true)

    this.textContent = '复制成功'
    setTimeout(() => {
      this.textContent = '复制算式和答案'
    }, 3000)
  })

  // 点击答案
  copyResult.addEventListener('click', function () {
    var textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'absolute'
    textarea.style.clip = 'rect(0 0 0 0)'
    // 赋值
    textarea.textContent = calculationResults
    // 选中
    textarea.select()
    // 复制
    document.execCommand('copy', true)
    this.textContent = '复制成功'
    setTimeout(() => {
      this.textContent = '答案'
    }, 3000)
  })

  // 点击清空
  clear.addEventListener('click', function () {
    official.textContent = ''
    result.textContent = ''
    localStorage.equation = ''
  })

  /* 按回车计算 */
  window.addEventListener('keyup', function (e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      try {
        calculationResults = eval(
          official.textContent
            .replace(/\/-/gm, '(')
            .replace(/-\//gm, ')')
            .replace(/×/gm, '*')
            .replace(/÷/gm, '/')
            .replace(/（/gm, '(')
            .replace(/）/gm, ')')
            .replace(/[，,。]/gm, '.')
            .replace(/=(\n+)?([0-9.\n]+)?/gm, '')
        )

        official.textContent = official.textContent
          .replace(/\/-/gm, '(')
          .replace(/-\//gm, ')')
          .replace(/\*/gm, '×')
          .replace(/\//gm, '÷')
          .replace(/（/gm, '(')
          .replace(/）/gm, ')')
          .replace(/[，,。]/gm, '.')
          .replace(/\s+/gm, '')
          .replace(/=(\n+)?([0-9.\n]+)?/gm, '')
        result.textContent = `计算结果为：${calculationResults}`
        Copyright.style = 'display:none'
      } catch (error) {
        result.textContent = '算式输入错误，请重新输入'
      }
    }

    localStorage.equation = btoa(official.textContent)
  })
}
