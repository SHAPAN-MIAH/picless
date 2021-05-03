declare global {
  interface Window {
    tpl: { core: any; plugin: any; load: (modulesNames?: string[]) => void }
    stream: any
    soundMeter: any
    Securionpay: any
  }
}
