<template>
        <span id="name">{{ person.name }},</span>
        <div class="tags">
                <span id="tag" v-for="tag in person.keywords">
                        <span id="sharp">#</span> {{ tag }}
                </span>
        </div>
        <div class="greeting" v-if="!answer">或许是服务欠费了？</div>
        <div class="greeting" v-if="!answer">真是可恶，偏偏是这个时候...</div>
        <div id="special">{{ answer ? '以及，' : '反正，' }}新年快乐 🎉🎉</div><br />
        <div id="note">—— 来自：wemsx</div>
</template>
<script setup>
import OpenAI from "openai";
import { ref } from "vue";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-249094e27df04195b7a194188002890f',//最后一位改了
        dangerouslyAllowBrowser: true
});
//sk-249094e27df04195b7a194188002890e
// curl -L -X GET 'https://api.deepseek.com/user/balance' -H 'Accept: application/json' -H 'Authorization: Bearer sk-249094e27df04195b7a194188002890e'
const answer = ref('')

async function main() {
        const completion = await openai.chat.completions.create({
                messages: [
                        { role: "system", content: "你现在是一个高三学生，准备给今年即将参与高考的同学写新年祝福" },
                        { role: "system", content: "请在保持要求的前提下尽可能简洁，不要过长" },
                        { role: "system", content: "用以下格式仿写一个新年祝福,不要和之前的相同，只返回文字：愿你新的一年如烟花般璀璨，前程万里" },
                        { role: "system", content: "请结合生活中常见的事物，不要局限于“晨曦”“朝阳”这类常用的意象" },
                ],
                model: "deepseek-chat",
                temperature: 1.5
        });

        console.log(completion.choices[0]);
        answer.value = completion.choices[0].message.content;
}

main();

let params = new URLSearchParams(window.location.search);

let person = {
        name: params.get('name') ? params.get('name') : '看到这里的你',
        keywords: params.get('key').split(',')
}
</script>
<style scoped>
#name, #special {
        font-size: 2rem;
}
#note {
        text-align: right;
        font-size: 1.8rem;
}
#tag {
        border-radius: 8px;
        background-color: rgba(79, 192, 141, 0.3);/**rgba(79, 192, 141, 0.3) */
        padding: 4px 8px;
        height: 20px;
        margin-right: 10px;
        font-size: 1.3rem;
}
#sharp {
        color: rgba(247, 247, 247, 0.5);
}
.greeting {
        word-break: break-all;
        font-size: 1.5rem;
        width: 120%;
}
</style>