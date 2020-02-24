<template>
  <div class="clipboard-wrapper Container">
    <el-row class="text-line" :gutter="20">
      <el-col class="text-title" :span="4">
        <div id="clipboard-text-label" class="grid-content bg-purple">Original</div>
      </el-col>
      <el-col :span="20">
        <div
          id="clipboard-text-content"
          class="grid-content bg-purple-dark"
        >{{ clipboardText.original }}</div>
      </el-col>
    </el-row>

    <el-row class="text-line" :gutter="20">
      <el-col class="text-title" :span="4">
        <div id="converted-text-label" class="grid-content bg-purple">Converted</div>
      </el-col>
      <el-col :span="20">
        <div
          id="converted-text-content"
          class="grid-content bg-purple-dark"
        >{{ clipboardText.converted }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { remote, ipcRenderer, IpcRendererEvent } from "electron";
const { Menu, dialog, Browser } = remote;

export default {
  name: "clipboard-content",
  data() {
    return {
      clipboardText: {
        original: "",
        converted: ""
      }
    };
  },
  mounted() {
    ipcRenderer.on("clipboardOriginal", (event, text) => {
      this.clipboardText.original = text;
    }),
      ipcRenderer.on("clipboardConverted", (event, text) => {
        this.clipboardText.converted = text;
      });
  }
};
</script>


<style lang="scss" scoped>
.text-line {
  background-color: $colorLightNavy;
  border-radius: 4px;
  display: flex;
  align-items: center;
  
  justify-content: space-between;
  margin: 12px 0;
  padding: 12px;
}

.text-title {
  text-align: right;
  font-weight: bold;
  letter-spacing: 0.05em;
}

</style>


