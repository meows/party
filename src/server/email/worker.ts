interface EmailMessage<Body = unknown> {
   readonly from: string;
   readonly to: string;
   readonly headers: Headers;
   readonly raw: ReadableStream;
   readonly rawSize: number;
 
   setReject(reason: String): void;
   forward(rcptTo: string, headers?: Headers): Promise<void>;
 }

// https://developers.cloudflare.com/workers/runtime-apis/email-event/
export default {
   async email(message:EmailMessage, env:Object, ctx:Object) {
     /**
      * Create your code
      */
   }
}
