import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtService } from "@nestjs/jwt";

import { Keypair, Networks, WebAuth } from "stellar-sdk";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    /**
     * 1) Challenge: gera transação SEP-10 para o cliente assinar
     */
    @Post("challenge")
    async challenge(@Body() body: { walletAddress: string }) {
        const { walletAddress } = body;

        // chave fixa do servidor (service account)
        const serverKeypair = Keypair.fromSecret("SBQKNEDNY7MZMPHV7P3LCYYHFPL6OO7IYVMTQKO4GIZSHXKW5I6EA3GE");

        const challengeXDR = WebAuth.buildChallengeTx(
            serverKeypair,
            walletAddress,
            "meusite.com", // seu domínio (homeDomain)
            300, // timeout em segundos
            Networks.TESTNET,
            "auth.meusite.com" // webAuthDomain
        );

        return { challengeXDR };
    }

    /**
     * 2) Verify: valida assinatura do cliente na transação SEP-10
     */
    @Post("verify")
    async verify(
        @Body() body: { signed_challenge: string; walletAddress: string }
    ) {
        const { signed_challenge, walletAddress } = body;

        const serverKeypair = Keypair.fromSecret("SBQKNEDNY7MZMPHV7P3LCYYHFPL6OO7IYVMTQKO4GIZSHXKW5I6EA3GE");

        try {
            // Verifica se a challenge foi assinada pelo cliente
            const signers = WebAuth.verifyChallengeTxSigners(
                signed_challenge,
                serverKeypair.publicKey(),
                Networks.TESTNET,
                [walletAddress], // quem precisa assinar
                "meusite.com",
                "auth.meusite.com"
            );

            if (!signers.includes(walletAddress)) {
                throw new UnauthorizedException("Assinatura inválida");
            }

            // busca usuário
            const user = await this.usersService.findFirst({ walletAddress });
            if (!user) throw new UnauthorizedException("Usuário não encontrado");

            // emite JWT
            const token = this.jwtService.sign({ id: user.id, email: user.email });
            return { token };
        } catch (err) {
            throw new UnauthorizedException("Challenge inválida ou não assinada");
        }
    }
}
