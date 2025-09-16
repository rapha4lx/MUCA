import axios from "axios";
import { useState } from "react";
import url from "./global-hook-config";
import { saveTokenToLocalStorage } from "../../token-utils";
import {
  isConnected,
  requestAccess,
  getAddress,
  getNetwork,
  signTransaction,
} from "@stellar/freighter-api";

type AuthResult = { success: boolean; message?: string };

/**
 * Hook that exposes authentication helpers:
 * - loginWithEmail: send email/password to backend to receive JWT
 * - loginWithFreighter: perform SEP-10 style flow using Freighter wallet
 *
 * Assumptions (adjust endpoints in `global-hook-config.ts` if your backend differs):
 * - POST `${url}/auth/login` with { email, password } -> { token } mudei p users.. toda as rotas..
 * - GET  `${url}/auth/challenge?account=${publicKey}` -> { challenge: string } (challenge XDR)
 * - POST `${url}/auth/verify` with { signed_challenge: string } -> { token }
 */
const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error: unknown) => {
    if (!error) return undefined;
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message;

    // Try to parse axios-like error shapes without `any`
    if (typeof error === "object" && error !== null) {
      const obj = error as Record<string, unknown>;
      const resp = obj["response"];
      if (typeof resp === "object" && resp !== null) {
        const respObj = resp as Record<string, unknown>;
        const data = respObj["data"];
        if (typeof data === "object" && data !== null) {
          const dataObj = data as Record<string, unknown>;
          const message = dataObj["message"];
          if (typeof message === "string") return message;
        }
      }

      const msg = obj["message"];
      if (typeof msg === "string") return msg;
    }

    return undefined;
  };

  const loginWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/users/login`, { email, password });
      const respData = response?.data as any;
      const token = respData?.token;
      if (token) {
        saveTokenToLocalStorage(token);
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false, message: "Token não recebido do servidor" };
    } catch (error: unknown) {
      setLoading(false);
      const message = getErrorMessage(error) || "Erro ao logar com email";
      return { success: false, message };
    }
  };

  // Try to find the Freighter object under different global names and wait a bit if not yet injected
  /*
   * Using the official freighter-api package is more reliable than checking globals.
   * We'll use isConnected/requestAccess/getAddress and signTransaction from the package.
   */

  const loginWithFreighter = async (networkPassphrase = "Test SDF Network ; September 2015"): Promise<AuthResult> => {
    setLoading(true);

    try {
      // Check if Freighter is available and connected
      const conn = await isConnected();
      if (!conn || !conn.isConnected) {
        setLoading(false);
        return { success: false, message: "Freighter não detectado no navegador." };
      }

      // Request access / public key (this will prompt the user if needed)
      let publicKey: string | undefined;
      try {
        const access = await requestAccess();
        if (access && (access as any).error) {
          // fallback to getAddress (no prompt)
          const addr = await getAddress();
          publicKey = (addr && (addr as any).address) || undefined;
        } else {
          publicKey = (access && (access as any).address) || undefined;
        }
      } catch (e) {
        // try getAddress as fallback
        try {
          const addr = await getAddress();
          publicKey = (addr && (addr as any).address) || undefined;
        } catch (ee) {
          publicKey = undefined;
        }
      }

      if (!publicKey) {
        setLoading(false);
        return { success: false, message: "Não foi possível obter a Public Key da Freighter (permission negada ou não autorizada)." };
      }

      // Request challenge from backend (SEP-10 style)
const challengeResp = await axios.post(`${url}/users/challenge`, { walletAddress: publicKey });
const challengeData = challengeResp?.data as any;
const challengeXdr = challengeData?.challengeXDR;
      if (!challengeXdr) {
        setLoading(false);
        return { success: false, message: "Servidor não retornou challenge XDR." };
      }
      // Ask Freighter to sign the challenge using freighter-api
      const signRes = await signTransaction(challengeXdr, { networkPassphrase, address: publicKey });
      if (!signRes || (signRes as any).error) {
        setLoading(false);
        const err = (signRes && (signRes as any).error) || "Erro ao assinar desafio com Freighter";
        return { success: false, message: typeof err === "string" ? err : JSON.stringify(err) };
      }

      const signedXdr = (signRes as any).signedTxXdr || (signRes as any).signedTx || (signRes as any).signed || undefined;
      if (!signedXdr) {
        setLoading(false);
        return { success: false, message: "Freighter retornou resposta inválida ao assinar." };
      }
          // Send signed XDR back to server for validation
  const verifyResp = await axios.post(`${url}/users/verify`, { 
  signed_challenge: signedXdr,
  walletAddress: publicKey // aqui é obrigatório
});
  const verifyData = verifyResp?.data as any;
  const token = verifyData?.token;
      if (token) {
        saveTokenToLocalStorage(token);
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false, message: "Servidor não retornou token após verificação." };
    } catch (error: unknown) {
      setLoading(false);
      const message = getErrorMessage(error) || "Erro ao autenticar via Freighter";
      return { success: false, message };
    }
  };

  return { loading, loginWithEmail, loginWithFreighter };
};

export default useAuth;
