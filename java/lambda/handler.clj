(ns lambda.handler
  (:require [uswitch.lambada.core :refer [deflambdafn]]))

(deflambdafn lambda.Handler
             [in out ctx]
             (require '[lambda.core])
             (let [handler (ns-resolve 'lambda.core '-handler)]
               (handler in out ctx)))
