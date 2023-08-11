<div align="center">
  <img width="55%" src="https://github.com/Doer-org/MorPhoto/assets/55625375/72bf2d4b-2a76-4dbb-ac0f-fcd106b62fdd">
  <h4>Let's enjoy AI-Driven Morphing Photographs!</h4>
  <br>
</div>

## What's MorPhoto?
[MorPhoto](https://www.morphoto.app) is a service that allows you to generate images by inputting an initial image and a transformation direction string. 
So why not have some fun and freely transform SNS icons, header images, and more?
Once you've crafted some intriguing images, don't hesitate to share them with others!

## Morphing Examples
<table>
  <tr>
    <td width="25%"><img src="https://github.com/Doer-org/MorPhoto/assets/55625375/13c00241-d902-494b-8796-dd4412beff86"/></td>
    <td width="25%"><img src="https://github.com/Doer-org/MorPhoto/assets/55625375/9a59bc5c-e3d1-4148-aa83-9948f86fbbcb"/></td>
    <td width="50%">
      <p>
        Input Prompt: 金魚すくい.<br>
        Strength: 0.85<br>
        <a href="https://www.morphoto.app/result/67b200c0-f43e-4261-8f3e-cb9128221a13">MorPhoto Result</a>
      </p>
      <blockquote>
        A vibrant, lively scene of goldfish scooping at a traditional Japanese festival, illuminated by lantern light. Festive, joyful, cultural, intricate, highly detailed, digital painting, night scene, lanterns, reflection.
      </blockquote>
    </td>
  </tr>
  <tr>
    <td width="25%"><img src="https://github.com/Doer-org/MorPhoto/assets/55625375/13c00241-d902-494b-8796-dd4412beff86"/></td>
    <td width="25%"><img src="https://github.com/Doer-org/MorPhoto/assets/55625375/aa51b43d-6589-45a2-aebf-a55700691095"/></td>
    <td width="50%">
      <p>
        Input Prompt: 遊園地<br>
        Strength: 0.83<br>
        <a href="https://www.morphoto.app/result/2641d813-4c84-473e-80bb-86f53ba82f87">MorPhoto Result</a>
      </p>
      <blockquote>
        A bustling amusement park at dusk, illuminated by vibrant neon lights. Exciting, energetic, lively, digital painting, concept art, dynamic lighting, crowded, roller coasters, ferris wheel, joyful atmosphere.
      </blockquote>
    </td>
  </tr>
</table>


## Mophing Process
<div align="center">
  <img width="800px" src="https://github.com/Doer-org/MorPhoto/assets/55625375/e15e0677-4d84-4695-b0f7-11a7f5228f92">
</div>

### Core Technologies
MorPhoto's core technologies are **"Prompt Conversion"** and **"Image Conversion"**.

- In **"Prompt Conversion"**, input text is transformed into a format suitable for image conversion. While regular sentences can also be converted, this step is crucial for achieving higher-performance image conversion.

- In the context of **"Image Conversion"**, morphing is conducted using a latent diffusion model based on the provided prompts. This approach contributes to the creation of high-quality images aligned with the intended visual outcomes.

## Tech Stack
<div align="center">
  <img width="800px" src="https://github.com/Doer-org/MorPhoto/assets/55625375/28c2b31f-61ac-4d7c-8dee-7bfdce5e0d66">
</div>

### 🤖 ML Deployment
The machine learning component has been deployed on [Modal](https://modal.com/), a usage-based billing model cloud computing service. This deployment structure incurs charges exclusively during inference, leading to a rationalization of hosting costs.

### ⚙️ BFF
Resource management to prevent redundant re-inference of identical images is managed by a Backend for Frontend (BFF) coded in F#.

## Contributers
<table>
  <tr>
    <td>
      <a href="https://github.com/RyushiAok">
        <img src="https://github.com/RyushiAok.png" width="100px;" alt="RyushiAok"/>
      </a>
      <br>
      <sub><a href="https://github.com/RyushiAok">RyushiAok</a><br>Infra / BackEnd</sub>
    </td>
    <td>
      <a href="https://github.com/yach36">
        <img src="https://github.com/yach36.png" width="100px;" alt="yach36"/>
      </a>
      <br>
      <sub><a href="https://github.com/yach36">yach36</a><br>FrontEnd</sub>
    </td>
    <td>
      <a href="https://github.com/ryoya0902">
        <img src="https://github.com/ryoya0902.png" width="100px;" alt="ryoya0902"/>
      </a>
      <br>
      <sub><a href="https://github.com/ryoya0902">ryoya0902</a><br>Machine Learning</sub>
    </td>
    <td>
      <a href="https://github.com/yuuugaaa">
        <img src="https://github.com/yuuugaaa.png" width="100px;" alt="yuuugaaa"/>
      </a>
      <br>
      <sub><a href="https://github.com/yuuugaaa">yuuugaaa</a><br>Design / FrontEnd</sub>
    </td>
  </tr>
</table>
